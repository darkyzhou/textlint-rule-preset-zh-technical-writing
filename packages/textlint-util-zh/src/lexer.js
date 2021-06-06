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
      return 'other';
  }
}

export function toTokens(string) {
  if (typeof string !== 'string') {
    throw new Error('invalid argument');
  }

  const tokens = [];
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
        type: tokenType,
        first: true,
        last: index === string.length - 1
      };
    } else if (lastToken.type === tokenType) {
      lastToken.string += character;
      lastToken.endIndex++;
      lastToken.last = lastToken.endIndex === string.length - 1;
    } else {
      tokens.push(lastToken);
      lastToken = {
        string: character,
        beginIndex: index,
        endIndex: index,
        type: tokenType,
        first: false,
        last: index === string.length - 1
      };
    }

    if (index === string.length - 1) {
      tokens.push(lastToken);
    }
  }

  return tokens;
}
