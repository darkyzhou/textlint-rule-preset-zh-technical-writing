import { runRuleTest } from 'textlint-util-zh';
import ruleObject from '../src';

const PLAIN_TEXT_CASES = [
  ['测试 Test 文本', '测试  Test   文本', '多余的空格', 2, 8],
  ['测试，测试，测试！', '测试， 测试， 测试 ！', '多余的空格', 3, 7, 10],
  ['已经 200% 了', '已 经  200% 了', '多余的空格', 1, 3]
];

const MARKDOWN_CASES = [
  // ['This is a `test` 文本', 'This is a  `test`  文本', '多余的空格', 10, 17],
  'Use: `const foo  =  123;`'
];

runRuleTest({
  name: 'no-redundant-space-around-token',
  tokenBasedRules: [ruleObject],
  plainTextFixableCases: PLAIN_TEXT_CASES,
  markdownValidCases: MARKDOWN_CASES
});
