import TextLintTester from 'textlint-tester';
import rule from '../src/index';

const tester = new TextLintTester();

const PLAIN_TEXT_VALID_CASES = [
  '今天出去买菜花了 5000 元。',
  '今天是 233° 的高温。',
  '新 MacBook Pro 有 15% 的 CPU 性能提升。',
  '刚刚买了一部 iPhone，好开心！'
];

const PLAIN_TEXT_INVALID_CASES = [
  ['今天出去买菜花了5000元。', '中文与数字之间需要添加空格', 8, 11],
  ['今天是 233 ° 的高温。', '数字与单位之间不需要添加空格', 7],
  ['新 MacBook Pro 有 15 % 的 CPU 性能提升。', '数字与单位之间不需要添加空格', 18],
  ['刚刚买了一部 iPhone， 好开心 ！', '全角标点与其他字符之间不需要添加空格', 14, 18]
];

const MARKDOWN_VALID_CASES = [
  '在 LeanCloud 上，数据存储是围绕 `AVObject` 进行的。每个 `AVObject` 都包含了与 JSON 兼容的 key-value 对应的数据。数据是 schema-free 的，你不需要在每个 `AVObject` 上提前指定存在哪些键，只要直接设定对应的 key-value 即可。'
];

const MARKDOWN_INVALID_CASES = [
  [
    '在LeanCloud上，数据存储是围绕`AVObject` 进行的。',
    '中文与英文之间需要添加空格',
    1,
    9,
    '行内代码块周围需要添加空格',
    19
  ]
];

function convertCaseToErrorObject(caseObject) {
  const errors = [];
  let message;

  for (const element of caseObject) {
    if (!message) {
      if (typeof element !== 'string') {
        throw new Error('invalid test case data: should start with a message string');
      }
      message = element;
    }

    switch (typeof element) {
      case 'number':
        errors.push({
          message,
          index: element
        });
        break;
      case 'string':
        message = element;
        break;
      default:
        throw new Error('invalid test case data: unsupported data type');
    }
  }

  return errors;
}

tester.run('盘古之白', rule, {
  valid: [
    ...PLAIN_TEXT_VALID_CASES.map((text) => ({ ext: '.txt', text })),
    ...MARKDOWN_VALID_CASES.map((text) => ({ ext: '.md', text }))
  ],
  invalid: [
    ...PLAIN_TEXT_INVALID_CASES.map((caseConfig) => ({
      ext: '.txt',
      text: caseConfig[0],
      errors: convertCaseToErrorObject(caseConfig.slice(1))
    })),
    ...MARKDOWN_INVALID_CASES.map((caseConfig) => ({
      ext: '.md',
      text: caseConfig[0],
      errors: convertCaseToErrorObject(caseConfig.slice(1))
    }))
  ]
});
