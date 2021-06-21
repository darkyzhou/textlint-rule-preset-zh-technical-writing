import {
  getRightAdjacentNode,
  getTextContent,
  getLeftAdjacentNode,
  REGEX_CHINESE_PUNCTUATION,
  REGEX_SPACE
} from 'textlint-util-zh';

export default {
  number: (ctx) => {
    return check(ctx, '中文与数字之间需要添加空格');
  },
  en_char: (ctx) => {
    return check(ctx, '中文与英文之间需要添加空格');
  }
};

function check({ textLintCtx, node, currentToken, previousToken, nextToken, helper, currentErrors }, message) {
  const { fixer, RuleError } = textLintCtx;
  const errors = [];

  if (previousToken?.type === 'zh_char') {
    const index = currentToken.beginIndex - 1;
    const errorIndex = currentErrors.findIndex((error) => error.index === index);
    if (errorIndex >= 0) {
      currentErrors[errorIndex].fix = fixer.replaceTextRange(
        [previousToken.beginIndex, previousToken.endIndex + 1],
        ` ${previousToken.string} `
      );
    } else {
      errors.push({
        message,
        index,
        fix: fixer.insertTextBeforeRange([currentToken.beginIndex, currentToken.endIndex + 1], ' ')
      });
    }
  }

  if (nextToken?.type === 'zh_char') {
    errors.push({
      message,
      index: currentToken.endIndex + 1,
      fix: fixer.insertTextAfterRange([currentToken.beginIndex, currentToken.endIndex + 1], ' ')
    });
  }

  if (!previousToken) {
    const leftAdjacentNode = getLeftAdjacentNode(helper, node);
    if (shouldCheckNode(leftAdjacentNode)) {
      const endChar = getTextContent(leftAdjacentNode).slice(-1);
      if (checkCharacter(endChar)) {
        errors.push({ message, index: currentToken.beginIndex - 1, fix: fixer.insertTextAfter(leftAdjacentNode, ' ') });
      }
    }
  }

  if (!nextToken) {
    const rightAdjacentNode = getRightAdjacentNode(helper, node);
    if (shouldCheckNode(rightAdjacentNode)) {
      const beginChar = getTextContent(rightAdjacentNode)[0];
      if (checkCharacter(beginChar)) {
        errors.push({ message, index: currentToken.endIndex + 1, fix: fixer.insertTextBefore(rightAdjacentNode, ' ') });
      }
    }
  }

  return errors.map(({ message, index, fix }) => new RuleError(message, { index, fix }));
}

function shouldCheckNode(node) {
  return node && ['Str', 'Delete', 'Emphasis', 'Strong', 'Link'].includes(node.type);
}

function checkCharacter(char) {
  return char !== '\n' && !REGEX_SPACE.test(char) && !REGEX_CHINESE_PUNCTUATION.test(char);
}
