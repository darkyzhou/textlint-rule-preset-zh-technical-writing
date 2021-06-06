export default {
  number_symbol: ({ textLintCtx, currentToken, currentIndex, tokens, previousToken }) => {
    const { fixer, RuleError } = textLintCtx;
    if (previousToken?.type === 'space' && tokens[currentIndex - 2]?.type === 'number') {
      return new RuleError('数字与单位符号之间不需要添加空格', {
        index: currentToken.beginIndex - 1,
        fix: fixer.removeRange([previousToken.beginIndex, previousToken.endIndex + 1])
      });
    }
  }
};
