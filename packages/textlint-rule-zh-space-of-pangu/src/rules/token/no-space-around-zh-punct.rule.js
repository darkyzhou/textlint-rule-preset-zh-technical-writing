export default {
  zh_punt: (context, node, topToken, tokens) => {
    if (tokens[1]?.type === 'space') {
      return new context.RuleError('全角标点与其他字符之间不需要添加空格', {
        index: topToken.beginIndex - 1
      });
    }
  },
  space: (context, node, topToken, tokens) => {
    if (tokens[1]?.type === 'zh_punt') {
      return new context.RuleError('全角标点与其他字符之间不需要添加空格', {
        index: topToken.beginIndex
      });
    }
  }
};
