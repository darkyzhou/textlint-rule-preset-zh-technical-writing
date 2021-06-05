export default {
  en_char: (context, node, topToken, tokens) => {
    if (tokens[1]?.type === 'zh_char') {
      return new context.RuleError('中文与英文之间需要添加空格', {
        index: topToken.beginIndex
      });
    }
  },
  zh_char: (context, node, topToken, tokens) => {
    if (tokens[1]?.type === 'en_char') {
      return new context.RuleError('中文与英文之间需要添加空格', {
        index: topToken.beginIndex - 1
      });
    }
  }
};
