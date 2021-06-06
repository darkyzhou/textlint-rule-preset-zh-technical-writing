export default {
  number_symbol: (context, node, topToken, tokens) => {
    const { fixer } = context;
    if (tokens[1]?.type === 'space' && tokens[2]?.type === 'number') {
      return new context.RuleError('数字与单位符号之间不需要添加空格', {
        index: topToken.beginIndex - 1,
        fix: fixer.removeRange([tokens[1].beginIndex, tokens[1].endIndex + 1])
      });
    }
  }
};
