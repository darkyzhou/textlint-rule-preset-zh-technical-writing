import assert from 'assert';
import { runLexerOnString } from '../src/lexer';

const TOKEN_CASES = [
  {
    string: '新 MacBook  有15% 的$提升\n！',
    expected: [
      ['新', 0, 0, 'zh_char'],
      [' ', 1, 1, 'space'],
      ['MacBook', 2, 8, 'en_char'],
      ['  ', 9, 10, 'space'],
      ['有', 11, 11, 'zh_char'],
      ['15', 12, 13, 'number'],
      ['%', 14, 14, 'number_symbol'],
      [' ', 15, 15, 'space'],
      ['的', 16, 16, 'zh_char'],
      ['$', 17, 17, 'other'],
      ['提升', 18, 19, 'zh_char'],
      ['\n', 20, 20, 'space'],
      ['！', 21, 21, 'zh_punt']
    ]
  }
];

describe('lexer', function () {
  describe('#runLexerOnString()', function () {
    it('should output correct tokens', function () {
      for (const { string, expected } of TOKEN_CASES) {
        let i = 0;
        let lastTokens;
        const expectedTokens = expected.map(([string, beginIndex, endIndex, type]) => ({
          string,
          beginIndex,
          endIndex,
          type
        }));

        runLexerOnString(string, ({ topToken, tokens }) => {
          lastTokens = tokens;
          assert.deepStrictEqual(topToken, tokens[0]);
          assert.deepStrictEqual(tokens, expectedTokens.slice(0, ++i).reverse());
        });
        assert.deepStrictEqual(lastTokens, expectedTokens.reverse());
      }
    });
  });
});
