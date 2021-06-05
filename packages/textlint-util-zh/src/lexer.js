import {
  REGEX_CHINESE_CHARACTER,
  REGEX_CHINESE_PUNCTUATION,
  REGEX_ENGLISH_WORD_CHARACTER,
  REGEX_NUMBER,
  REGEX_NUMBER_SYMBOL,
  REGEX_SPACE
} from './zh-regex';

function getTokenType(character) {
  switch (true) {
    case REGEX_CHINESE_CHARACTER.test(character):
      return 'zh_char';
    case REGEX_CHINESE_PUNCTUATION.test(character):
      return 'zh_punt';
    case REGEX_NUMBER_SYMBOL.test(character):
      return 'number_symbol';
    case REGEX_NUMBER.test(character):
      return 'number';
    case REGEX_ENGLISH_WORD_CHARACTER.test(character):
      return 'en_char';
    case REGEX_SPACE.test(character):
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
  const emit = () =>
    consumer({
      topToken: currentTokens[currentTokens.length - 1],
      // notice: the tokens to be yielded is reversed
      // this is for the convenience of consumers in
      // which they can look up previous tokens through
      // tokens[1], tokens[2], ...
      // instead of tokens[tokens.length - 2], ...
      tokens: [...currentTokens].reverse()
    });

  let lastToken;
  let index = -1;

  for (const character of string) {
    index++;

    const tokenType = getTokenType(character);

    if (!lastToken) {
      lastToken = {
        string: character,
        beginIndex: index,
        endIndex: index,
        type: tokenType
      };
    } else if (lastToken.type === tokenType) {
      lastToken.string += character;
      lastToken.endIndex++;
    } else {
      currentTokens.push(lastToken);
      emit();

      lastToken = {
        string: character,
        beginIndex: index,
        endIndex: index,
        type: tokenType
      };
    }

    if (index === string.length - 1) {
      currentTokens.push(lastToken);
      emit();
    }
  }
}
