import TextLintTester from 'textlint-tester';
import rule from '../src/index';

const tester = new TextLintTester();

tester.run('盘古之白', rule, {
  valid: ['在 LeanCloud 上，数据存储是围绕 `AVObject` 进行的。'],
  invalid: [
    {
      text: '在LeanCloud 上，数据存储是围绕 `AVObject`进行的。',
      errors: [
        {
          message: '中文与数字、英文之间需要增加空格',
          index: 2
        },
        {
          message: '中文与数字、英文之间需要增加空格',
          index: 31
        }
      ]
    }
  ]
});
