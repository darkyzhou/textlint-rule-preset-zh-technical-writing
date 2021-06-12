import {
  getRightAdjacentNode,
  getTextContent,
  getLeftAdjacentNode,
  REGEX_CHINESE_PUNCTUATION,
  REGEX_SPACE
} from 'textlint-util-zh';

export default {
  en_char: ({ textLintCtx, node, currentToken, previousToken, nextToken, helper }) => {
    const { fixer, RuleError } = textLintCtx;
    const errors = [];

    if (previousToken?.type === 'zh_char') {
      errors.push(
        new RuleError('中文与英文之间需要添加空格', {
          index: currentToken.beginIndex,
          fix: fixer.insertTextBeforeRange([currentToken.beginIndex, currentToken.endIndex + 1], ' ')
        })
      );
    }

    if (nextToken?.type === 'zh_char') {
      errors.push(
        new RuleError('中文与英文之间需要添加空格', {
          index: currentToken.endIndex,
          fix: fixer.insertTextAfterRange([currentToken.beginIndex, currentToken.endIndex + 1], ' ')
        })
      );
    }

    const shouldCheckNode = (node) => node && ['Str', 'Delete', 'Emphasis', 'Strong', 'Link'].includes(node.type);

    if (!previousToken) {
      const leftAdjacentNode = getLeftAdjacentNode(helper, node);
      if (shouldCheckNode(leftAdjacentNode)) {
        const nodeTextEnd = getTextContent(leftAdjacentNode).slice(-1);
        if (nodeTextEnd !== '\n' && !REGEX_SPACE.test(nodeTextEnd) && !REGEX_CHINESE_PUNCTUATION.test(nodeTextEnd)) {
          errors.push(
            new RuleError('中文与英文之间需要添加空格', {
              index: currentToken.beginIndex,
              fix: fixer.insertTextAfter(leftAdjacentNode, ' ')
            })
          );
        }
      }
    }

    if (!nextToken) {
      const rightAdjacentNode = getRightAdjacentNode(helper, node);
      if (shouldCheckNode(rightAdjacentNode)) {
        const nodeTextBegin = getTextContent(rightAdjacentNode)[0];
        if (
          nodeTextBegin !== '\n' &&
          !REGEX_SPACE.test(nodeTextBegin) &&
          !REGEX_CHINESE_PUNCTUATION.test(nodeTextBegin)
        ) {
          errors.push(
            new RuleError('中文与英文之间需要添加空格', {
              index: currentToken.endIndex,
              fix: fixer.insertTextBefore(rightAdjacentNode, ' ')
            })
          );
        }
      }
    }

    return errors;
  }
};
