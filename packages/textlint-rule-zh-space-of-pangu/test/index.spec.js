import TextLintTester from 'textlint-tester';
import rule from '../src/index';

const tester = new TextLintTester();

const MARKDOWN_VALID_CASES = ['在 LeanCloud 上，数据存储是围绕 `AVObject` 进行的。'];

const PLAIN_TEXT_VALID_CASES = [
  `测试
Test 测试`
];

const MARKDOWN_INVALID_CASES = [['在LeanCloud上，数据存储是围绕`AVObject` 进行的。', 1, 9, 20]];

tester.run('盘古之白', rule, {
  valid: [
    ...MARKDOWN_VALID_CASES.map((text) => ({ ext: '.md', text })),
    ...PLAIN_TEXT_VALID_CASES.map((text) => ({ ext: '.txt', text }))
  ],
  invalid: [
    ...MARKDOWN_INVALID_CASES.map((c) => ({
      ext: '.md',
      text: c[0],
      errors: c.slice(1).map((index) => ({ index }))
    }))
  ]
});
