export default {
  number: (context, node, topToken, tokens) => {
    const { fixer } = context;
    if (tokens[1]?.type === 'zh_char') {
      return new context.RuleError('中文与数字之间需要添加空格', {
        index: topToken.beginIndex,
        fix: fixer.insertTextBeforeRange([topToken.beginIndex, topToken.endIndex + 1], ' ')
      });
    }
  },
  zh_char: (context, node, topToken, tokens) => {
    const { fixer } = context;
    if (tokens[1]?.type === 'number') {
      return new context.RuleError('中文与数字之间需要添加空格', {
        index: topToken.beginIndex - 1,
        fix: fixer.insertTextBeforeRange([topToken.beginIndex, topToken.endIndex + 1], ' ')
      });
    }
  }
};
