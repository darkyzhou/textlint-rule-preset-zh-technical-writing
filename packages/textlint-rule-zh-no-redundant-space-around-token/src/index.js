export default {
  space: ({ textLintCtx, currentToken, tokens, previousToken, nextToken }) => {
    const { fixer, RuleError } = textLintCtx;

    if (currentToken.string.includes('\n')) {
      // TODO: should we handle the case with \n?
      return;
    }

    if (tokens.first || tokens.last) {
      // TODO: quite a complex case
    } else {
      if (['zh_char', 'zh_punt'].includes(previousToken?.type) && ['zh_char', 'zh_punt'].includes(nextToken?.type)) {
        return new RuleError('多余的空格', {
          index: currentToken.beginIndex,
          fix: fixer.removeRange([currentToken.beginIndex, currentToken.endIndex + 1])
        });
      }

      if (currentToken.string.length > 1) {
        if (previousToken?.type === 'number' && nextToken?.type === 'number_symbol') {
          // let rule no-space-between-zh-and-num-symbol handle this
          return;
        }
        return new RuleError('多余的空格', {
          index: currentToken.beginIndex,
          fix: fixer.removeRange([currentToken.beginIndex + 1, currentToken.endIndex + 1])
        });
      }
    }
  }
};
