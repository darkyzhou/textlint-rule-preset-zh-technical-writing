import assert from 'assert';
import { tokenize } from '../src/lexer';

const TOKEN_CASES = [
  {
    string: '新 MacBook  有15% 的$提升。',
    expectedTokens: [
      ['新', 0, 0, 'zh_char'],
      [' ', 1, 1, 'space'],
      ['MacBook', 2, 8, 'en_char'],
      ['  ', 9, 10, 'space'],
      ['有', 11, 11, 'zh_char'],
      ['15', 12, 13, 'number'],
      ['%', 14, 14, 'number_symbol'],
      [' ', 15, 15, 'space'],
      ['的', 16, 16, 'zh_char'],
      ['$', 17, 17, 'unknown'],
      ['提升', 18, 19, 'zh_char'],
      ['。', 20, 20, 'zh_punt']
    ]
  }
];

describe('lexer', function () {
  describe('tokenize()', function () {
    it('should output correct tokens', function () {
      for (const { string, expectedTokens } of TOKEN_CASES) {
        let i = 0;
        for (const { topToken, tokens } of tokenize(string)) {
          assert.deepStrictEqual(topToken, tokens[0]);
          assert.deepStrictEqual(
            tokens,
            expectedTokens
              .slice(0, ++i)
              .reverse()
              .map(([string, beginIndex, endIndex, type]) => ({
                string,
                beginIndex,
                endIndex,
                type
              }))
          );
        }
      }
    });
  });
});
