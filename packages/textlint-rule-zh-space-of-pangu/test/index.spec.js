import TextLintTester from 'textlint-tester';
import rule from '../src/index';

const tester = new TextLintTester();

tester.run('盘古之白', rule, {
  valid: [
    {
      ext: '.md',
      text: '在 LeanCloud 上，数据存储是围绕 `AVObject` 进行的。'
    }
  ],
  invalid: [
    {
      ext: '.md',
      text: '在LeanCloud上，数据存储是围绕`AVObject` 进行的。',
      errors: [
        {
          index: 1
        },
        {
          index: 9
        },
        {
          index: 20
        }
      ]
    }
  ]
});
