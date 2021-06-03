import { RuleHelper } from 'textlint-rule-helper';
import { getTextContent } from 'textlint-util-zh';

const WORD_REGEX = /[\w]+/gi;

export default (context) => {
  const { Syntax, RuleError, report, getSource } = context;
  const helper = new RuleHelper(context);

  return {
    [Syntax.Str](node) {
      const ancestors = helper.getParents(node);
      const text = getSource(node);
      const errors = [];

      for (const match of text.matchAll(WORD_REGEX)) {
        const beginIndex = match.index;
        const endIndex = match.index + match[0].length;

        if (beginIndex > 0 && text[beginIndex - 1] !== ' ') {
          errors.push({ index: 1 + beginIndex });
        }

        if (endIndex < text.length - 1 && text[endIndex + 1] !== ' ') {
          errors.push({ index: 1 + endIndex });
        }

        let checkBeginSpace = beginIndex === 0;
        let checkEndSpace = endIndex === text.length - 1;
        if (checkBeginSpace || checkEndSpace) {
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

            const index = ancestorChildren.indexOf(containingNode);
            if (checkBeginSpace) {
              if (index > 0) {
                const nodeToLookForSpace = ancestorChildren[index - 1];
                const nodeText = getTextContent(nodeToLookForSpace);
                if (!nodeText.endsWith(' ')) {
                  errors.push({ index: 1 + beginIndex });
                }
                checkBeginSpace = false;
              }
            }
            if (checkEndSpace) {
              if (index < ancestorChildren.length - 1) {
                const nodeToLookForSpace = ancestorChildren[index + 1];
                const nodeText = getTextContent(nodeToLookForSpace);
                if (!nodeText.startsWith(' ')) {
                  errors.push({ index: 1 + endIndex });
                }
                checkEndSpace = false;
              }
            }
          }
        }
      }

      if (errors.length > 0) {
        report(node, new RuleError('中文与数字、英文之间需要增加空格', errors));
      }
    }
  };
};
