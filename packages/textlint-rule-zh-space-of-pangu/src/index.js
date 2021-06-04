import { RuleHelper } from 'textlint-rule-helper';
import { getTextContent } from 'textlint-util-zh';

const WORD_REGEX = /[\w-]+/gi;
const FULL_WORD_REGEX = /^[\w-]$/i;
const SPACE_REGEX = /((?<space>[ ]+)|(?<word>[^ ]+))/g;

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
  const { report } = context;
  const errors = [
    ...checkMissingSpaces(context, node, extraIndexPadding),
    ...checkRedundantSpaces(context, node, extraIndexPadding)
  ];

  if (errors.length > 0) {
    errors.forEach((error) => report(node, error));
  }
}

function checkMissingSpaces(context, node, extraIndexPadding) {
  const { RuleError, Syntax } = context;
  const helper = new RuleHelper(context);
  const ancestors = helper.getParents(node);
  const nodeValue = node.value;

  const errorIndexes = [];
  for (const match of nodeValue.matchAll(WORD_REGEX)) {
    const beginIndex = match.index;
    const endIndex = match.index + match[0].length - 1;

    if (beginIndex > 0 && !isValidSurroundingsForNonChineseWords(nodeValue[beginIndex - 1])) {
      errorIndexes.push(beginIndex);
    }

    if (endIndex < nodeValue.length - 1 && !isValidSurroundingsForNonChineseWords(nodeValue[endIndex + 1])) {
      errorIndexes.push(endIndex);
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
          if (nodeToLookForSpace.type !== Syntax.Break) {
            const nodeText = getTextContent(nodeToLookForSpace);
            // TODO: handle the case when nodeText === ''
            if (!isValidSurroundingsForNonChineseWords(nodeText.slice(-1))) {
              errorIndexes.push(beginIndex);
            }
          }
          checkBeginSpace = false;
        }
      }
      if (checkEndSpace) {
        if (containingNodeIndex < ancestorChildren.length - 1) {
          const nodeToLookForSpace = ancestorChildren[containingNodeIndex + 1];
          if (nodeToLookForSpace.type !== Syntax.Break) {
            const nodeText = getTextContent(nodeToLookForSpace);
            // TODO: handle the case when nodeText === ''
            if (!isValidSurroundingsForNonChineseWords(nodeText[0])) {
              errorIndexes.push(endIndex);
            }
          }
          checkEndSpace = false;
        }
      }
    }
  }

  return errorIndexes.map(
    (index) => new RuleError('中文与数字或英文之间需要增加空格', { index: extraIndexPadding + index })
  );
}

function checkRedundantSpaces(context, node, extraIndexPadding) {
  const { RuleError, Syntax } = context;
  const nodeValue = node.value;
  const results = [...nodeValue.matchAll(SPACE_REGEX)];
  const errors = [];
  results.forEach((result, i) => {
    const match = result[0];
    const beginIndex = result.index;
    const endIndex = result.index + match.length - 1;
    const isSpace = result.groups.space;

    if (isSpace) {
      if (i < results.length - 1 && isChinesePunctuation(results[i + 1][0][0])) {
        // TODO: no punctuations at the beginning of a line
        errors.push({ message: '全角标点与其他字符之间不需要加空格', index: extraIndexPadding + beginIndex });
      }

      if (i > 0 && isChinesePunctuation(results[i - 1][0].slice(-1))) {
        errors.push({ message: '全角标点与其他字符之间不需要加空格', index: extraIndexPadding + endIndex });
      }
    }
  });
  return errors.map((error) => new RuleError(error.message, { index: error.index }));
}

function isValidSurroundingsForNonChineseWords(character) {
  return /[ ]/i.test(character) || isChinesePunctuation(character);
}

function isChinesePunctuation(word) {
  return /^[\p{Punctuation}]+$/u.test(word) && /^[\p{Script=Han}]+$/u;
}
