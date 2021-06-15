export default {
  other: ({ textLintCtx, currentToken }) => {
    const { fixer, RuleError } = textLintCtx;
    if (/^[.]{3,}$/.test(currentToken.string)) {
      return new RuleError('中文为主的文本下应该使用中文省略号', {
        index: currentToken.beginIndex,
        fix: fixer.replaceTextRange([currentToken.beginIndex, currentToken.endIndex + 1], '……')
      });
    }
  }
};
