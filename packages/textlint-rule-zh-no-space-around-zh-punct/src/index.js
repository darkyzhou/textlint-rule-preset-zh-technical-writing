export default {
  zh_punt: ({ textLintCtx, previousToken, nextToken }) => {
    const { fixer, RuleError } = textLintCtx;

    if (previousToken?.type === 'space') {
      return new RuleError('全角标点与其他字符之间不需要添加空格', {
        index: previousToken.endIndex,
        fix: fixer.removeRange([previousToken.beginIndex, previousToken.endIndex + 1])
      });
    }

    if (nextToken?.type === 'space') {
      return new RuleError('全角标点与其他字符之间不需要添加空格', {
        index: nextToken.beginIndex,
        fix: fixer.removeRange([nextToken.beginIndex, nextToken.endIndex + 1])
      });
    }
  }
};
