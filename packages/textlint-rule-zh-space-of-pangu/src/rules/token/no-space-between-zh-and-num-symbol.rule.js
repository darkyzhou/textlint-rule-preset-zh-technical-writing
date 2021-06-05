export default {
  number_symbol: (context, node, topToken, tokens) => {
    if (tokens[1]?.type === 'space' && tokens[2]?.type === 'number') {
      return new context.RuleError('数字与单位之间不需要添加空格', {
        index: topToken.beginIndex - 1
      });
    }
  }
};
