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

export function runLexerOnString(string, consumer) {
  if (typeof string !== 'string' || typeof consumer !== 'function') {
    throw new Error('invalid argument');
  }

  const currentTokens = [];
  let lastBeginIndex;
  let lastTokenType;
  let lastTokenString = '';
  let index = -1;

  for (const character of string) {
    index++;

    const tokenType = getTokenType(character);

    if (!lastTokenType) {
      lastBeginIndex = index;
      lastTokenType = tokenType;
      lastTokenString += character;
    } else if (lastTokenType !== tokenType) {
      currentTokens.push({
        string: lastTokenString,
        beginIndex: lastBeginIndex,
        endIndex: lastBeginIndex + lastTokenString.length - 1,
        type: lastTokenType
      });
      lastBeginIndex = index;
      lastTokenString = character;
      lastTokenType = tokenType;

      consumer({
        topToken: currentTokens[currentTokens.length - 1],
        // notice: the tokens to be yielded is reversed
        // this is for the convenience of consumers in
        // which they can look up previous tokens through
        // tokens[1], tokens[2], ...
        // instead of tokens[tokens.length - 2], ...
        tokens: [...currentTokens].reverse()
      });
    } else {
      lastTokenString += character;
    }

    if (index === string.length - 1) {
      currentTokens.push({
        string: lastTokenString,
        beginIndex: lastBeginIndex,
        endIndex: lastBeginIndex + lastTokenString.length - 1,
        type: lastTokenType
      });
      consumer({
        topToken: currentTokens[currentTokens.length - 1],
        tokens: [...currentTokens].reverse()
      });
    }
  }
}
