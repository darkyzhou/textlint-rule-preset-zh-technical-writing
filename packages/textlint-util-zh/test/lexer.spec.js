import assert from 'assert';
import { tokenize } from '../src/lexer';

const TOKEN_CASES = [
  {
    string: '新 MacBook  有15% 的$提升。',
    expectedTokens: [
      ['新', 'zh_char'],
      [' ', 'space'],
      ['MacBook', 'en_char'],
      ['  ', 'space'],
      ['有', 'zh_char'],
      ['15', 'number'],
      ['%', 'number_symbol'],
      [' ', 'space'],
      ['的', 'zh_char'],
      ['$', 'unknown'],
      ['提升', 'zh_char'],
      ['。', 'zh_punt']
    ]
  }
];

describe('lexer', function () {
  describe('tokenize()', function () {
    it('should output correct tokens', function () {
      for (const { string, expectedTokens } of TOKEN_CASES) {
        let i = 0;
        for (const { tokens } of tokenize(string)) {
          assert.deepStrictEqual(
            tokens,
            expectedTokens
              .slice(0, ++i)
              .reverse()
              .map(([token, type]) => ({
                token,
                type
              }))
          );
        }
      }
    });
  });
});
