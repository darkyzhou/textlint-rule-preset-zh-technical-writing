import { REGEX_CHINESE_PUNCTUATION_PAIR_USED } from 'textlint-util-zh';

const WHITELIST_PAIRS = ['……', '——', '？！', '！？'];

export default {
  zh_punt: ({ textLintCtx, currentToken }) => {
    const { RuleError } = textLintCtx;
    const stringToCheck = currentToken.string;
    let whitelistPairOccurred = false;

    if (stringToCheck.length <= 1) {
      return;
    }

    for (let index = 0; index < stringToCheck.length - 1; index++) {
      const char = stringToCheck[index];
      const nextChar = stringToCheck[index + 1];
      const isCurrentCharPairUsed = REGEX_CHINESE_PUNCTUATION_PAIR_USED.test(char);
      const isNextCharPairUsed = REGEX_CHINESE_PUNCTUATION_PAIR_USED.test(nextChar);

      if (WHITELIST_PAIRS.some((pair) => pair === char + nextChar)) {
        if (whitelistPairOccurred) {
          return new RuleError('多余的标点符号', { index: currentToken.beginIndex + index });
        }
        whitelistPairOccurred = true;
        index++;
        continue;
      }

      if (char === nextChar) {
        if ((isCurrentCharPairUsed && !isNextCharPairUsed) || (!isCurrentCharPairUsed && isNextCharPairUsed)) {
          continue;
        }
      } else {
        if (isCurrentCharPairUsed || isNextCharPairUsed) {
          continue;
        }
      }

      return new RuleError('多余的标点符号', { index: currentToken.beginIndex + index });
    }
  }
};
