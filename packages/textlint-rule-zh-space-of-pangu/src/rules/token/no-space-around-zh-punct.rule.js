export default {
  zh_punt: (context, node, topToken, tokens) => {
    const { fixer } = context;
    if (tokens[1]?.type === 'space') {
      return new context.RuleError('全角标点与其他字符之间不需要添加空格', {
        index: topToken.beginIndex - 1,
        fix: fixer.removeRange([tokens[1].beginIndex, tokens[1].endIndex + 1])
      });
    }
  },
  space: (context, node, topToken, tokens) => {
    const { fixer } = context;
    if (tokens[1]?.type === 'zh_punt') {
      return new context.RuleError('全角标点与其他字符之间不需要添加空格', {
        index: topToken.beginIndex,
        fix: fixer.removeRange([topToken.beginIndex, topToken.endIndex + 1])
      });
    }
  }
};
