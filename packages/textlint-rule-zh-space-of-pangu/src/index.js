import { RuleHelper } from 'textlint-rule-helper';
import { getTextContent } from 'textlint-util-zh';

const WORD_REGEX = /[\w]+/gi;

export default (context) => {
  const { Syntax } = context;

  return {
    [Syntax.Code](node) {
      doCheck(context, node, 1);
    },
    [Syntax.Str](node) {
      doCheck(context, node, 0);
    }
  };
};

function doCheck(context, node, extraIndexPadding) {
  const { RuleError, report } = context;
  const helper = new RuleHelper(context);
  const ancestors = helper.getParents(node);
  const nodeValue = node.value;
  const errors = [];

  for (const match of nodeValue.matchAll(WORD_REGEX)) {
    const beginIndex = match.index;
    const endIndex = match.index + match[0].length - 1;

    if (beginIndex > 0 && nodeValue[beginIndex - 1] !== ' ') {
      errors.push({ index: extraIndexPadding + beginIndex });
    }

    if (endIndex < nodeValue.length - 1 && nodeValue[endIndex + 1] !== ' ') {
      errors.push({ index: extraIndexPadding + endIndex });
    }

    let checkBeginSpace = beginIndex === 0;
    let checkEndSpace = endIndex === nodeValue.length - 1;
    let containingNode = node;
    for (const ancestorNode of ancestors) {
      if (!checkBeginSpace && !checkEndSpace) {
        break;
      }

      const ancestorChildren = ancestorNode.children;
      if (ancestorChildren.length <= 1) {
        containingNode = ancestorNode;
        continue;
      }

      const containingNodeIndex = ancestorChildren.indexOf(containingNode);
      if (checkBeginSpace) {
        if (containingNodeIndex > 0) {
          const nodeToLookForSpace = ancestorChildren[containingNodeIndex - 1];
          const nodeText = getTextContent(nodeToLookForSpace);
          if (!nodeText.endsWith(' ')) {
            errors.push({ index: extraIndexPadding + beginIndex });
          }
          checkBeginSpace = false;
        }
      }
      if (checkEndSpace) {
        if (containingNodeIndex < ancestorChildren.length - 1) {
          const nodeToLookForSpace = ancestorChildren[containingNodeIndex + 1];
          const nodeText = getTextContent(nodeToLookForSpace);
          if (!nodeText.startsWith(' ')) {
            errors.push({ index: extraIndexPadding + endIndex });
          }
          checkEndSpace = false;
        }
      }
    }
  }

  if (errors.length > 0) {
    errors.forEach((error) => report(node, new RuleError('中文与数字、英文之间需要增加空格', error)));
  }
}
