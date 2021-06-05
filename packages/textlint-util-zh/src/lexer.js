function getTokenType(character) {
  switch (true) {
    case /^[\p{Script=Han}]$/u.test(character):
      return 'zh_char';
    case /^[（）〈〉《》「」『』﹃﹄〔〕…—～﹏、【】，。？！：；“”‘’]$/u.test(character):
      return 'zh_punt';
    case /^[℉℃°%]$/u.test(character):
      return 'number_symbol';
    case /^\d$/.test(character):
      return 'number';
    case /^[\w-\/]$/i.test(character):
      return 'en_char';
    case /^\s$/.test(character):
      return 'space';
    default:
      return 'unknown';
  }
}

export function* tokenize(string) {
  const currentTokens = [];
  let lastTokenType;
  let lastToken = '';

  for (const character of string) {
    const tokenType = getTokenType(character);

    if (!lastTokenType) {
      lastTokenType = tokenType;
      lastToken += character;
    } else if (lastTokenType !== tokenType) {
      currentTokens.push({
        token: lastToken,
        type: lastTokenType
      });
      lastToken = character;
      lastTokenType = tokenType;

      yield {
        // notice: the tokens to be yielded is reversed
        // this is for the convenience of consumers in
        // which they can look up previous tokens through
        // tokens[1], tokens[2], ...
        // instead of tokens[tokens.length - 2], ...
        tokens: [...currentTokens].reverse()
      };
    } else {
      lastToken += character;
    }
  }

  return {
    tokens: [...currentTokens].reverse()
  };
}

export function runLexerOnString(string, consumer) {
  if (typeof string !== 'string' || typeof consumer !== 'function') {
    throw new Error('invalid argument');
  }

  for (const { tokens } of tokenize(string)) {
    consumer(tokens);
  }
}
