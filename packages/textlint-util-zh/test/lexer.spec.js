import assert from 'assert';
import { toTokens } from '../src/lexer';

const TOKEN_CASES = [
  {
    string: 'a',
    expected: [['a', 0, 0, 'en_char', true, true]]
  },
  {
    string: '新 MacBook  有15% 的$提升\n！',
    expected: [
      ['新', 0, 0, 'zh_char', true, false],
      [' ', 1, 1, 'space', false, false],
      ['MacBook', 2, 8, 'en_char', false, false],
      ['  ', 9, 10, 'space', false, false],
      ['有', 11, 11, 'zh_char', false, false],
      ['15', 12, 13, 'number', false, false],
      ['%', 14, 14, 'unit_symbol', false, false],
      [' ', 15, 15, 'space', false, false],
      ['的', 16, 16, 'zh_char', false, false],
      ['$', 17, 17, 'other', false, false],
      ['提升', 18, 19, 'zh_char', false, false],
      ['\n', 20, 20, 'space', false, false],
      ['！', 21, 21, 'zh_punt', false, true]
    ]
  }
];

describe('lexer', function () {
  describe('#runLexerOnString()', function () {
    it('should output correct tokens', function () {
      for (const { string, expected } of TOKEN_CASES) {
        const tokens = toTokens(string);
        const expectedTokens = expected.map(([string, beginIndex, endIndex, type, first, last]) => ({
          string,
          beginIndex,
          endIndex,
          type,
          first,
          last
        }));
        assert.deepStrictEqual(tokens, expectedTokens);
      }
    });
  });
});
