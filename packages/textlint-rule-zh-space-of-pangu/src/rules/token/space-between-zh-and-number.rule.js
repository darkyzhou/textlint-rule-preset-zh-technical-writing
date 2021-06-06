export default {
  number: ({ textLintCtx, currentToken, previousToken, nextToken }) => {
    const { fixer, RuleError } = textLintCtx;
    const errors = [];

    if (previousToken?.type === 'zh_char') {
      errors.push(
        new RuleError('中文与数字之间需要添加空格', {
          index: currentToken.beginIndex,
          fix: fixer.insertTextBeforeRange([currentToken.beginIndex, currentToken.endIndex + 1], ' ')
        })
      );
    }

    if (nextToken?.type === 'zh_char') {
      errors.push(
        new RuleError('中文与数字之间需要添加空格', {
          index: currentToken.endIndex,
          fix: fixer.insertTextAfterRange([currentToken.beginIndex, currentToken.endIndex + 1], ' ')
        })
      );
    }

    return errors;
  }
};
