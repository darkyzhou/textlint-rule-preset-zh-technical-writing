export default {
  other: ({ textLintCtx, currentToken }) => {
    const { fixer, RuleError } = textLintCtx;
    if (/^[.]{3,}$/.test(currentToken.string)) {
      return new RuleError('中文为主的文本下应该使用中文省略号', {
        index: currentToken.beginIndex,
        fix: fixer.replaceTextRange([currentToken.beginIndex, currentToken.endIndex + 1], '……')
      });
    }
  },
  zh_punt: ({ textLintCtx, currentToken }) => {
    const { fixer, RuleError } = textLintCtx;

    if (/^…[^…]*$/u.test(currentToken.string)) {
      return new RuleError('中文省略号应该为两个连用', {
        index: currentToken.beginIndex,
        fix: fixer.insertTextAfterRange([currentToken.beginIndex, currentToken.beginIndex + 1], '…')
      });
    }

    const singleEllipsisIndex = currentToken.string.search(/(?<=[^…]+)…(?=[^…]+)/u);
    if (singleEllipsisIndex >= 0) {
      return new RuleError('中文省略号应该为两个连用', {
        index: currentToken.beginIndex + singleEllipsisIndex,
        fix: fixer.insertTextAfterRange([currentToken.beginIndex, currentToken.beginIndex + singleEllipsisIndex], '…')
      });
    }

    const multipleEllipsisMatchResult = currentToken.string.match(/[…]{3,}/u);
    if (multipleEllipsisMatchResult) {
      const beginIndex = currentToken.beginIndex + multipleEllipsisMatchResult.index;
      const endIndex = beginIndex + multipleEllipsisMatchResult[0].length;
      return new RuleError('中文省略号应该为两个连用', {
        index: beginIndex,
        fix: fixer.replaceTextRange([beginIndex, endIndex], '……')
      });
    }
  }
};
