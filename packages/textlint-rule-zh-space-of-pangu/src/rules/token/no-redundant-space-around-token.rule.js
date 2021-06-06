export default {
  space: (context, node, topToken, tokens) => {
    const { fixer, RuleError } = context;

    if (topToken.string.includes('\n')) {
      // TODO: should we handle the case with \n?
      return;
    }

    if (tokens.first || tokens.last) {
      // TODO: quite a complex case
    } else {
      if (topToken.string.length > 1) {
        return new RuleError('多余的空格', {
          index: topToken.beginIndex,
          fix: fixer.removeRange([topToken.beginIndex + 1, topToken.endIndex + 1])
        });
      }
    }
  },
  zh_char: (context, node, topToken, tokens) => {
    return handleCharAndPunctuation(context, node, topToken, tokens);
  },
  zh_punt: (context, node, topToken, tokens) => {
    return handleCharAndPunctuation(context, node, topToken, tokens);
  }
};

function handleCharAndPunctuation(context, node, topToken, tokens) {
  const { fixer, RuleError } = context;

  if (tokens[1]?.type === 'space' && ['zh_char', 'zh_punt'].includes(tokens[2]?.type)) {
    return new RuleError('多余的空格', {
      index: tokens[1].beginIndex,
      fix: fixer.removeRange([tokens[1].beginIndex, tokens[1].endIndex + 1])
    });
  }
}
