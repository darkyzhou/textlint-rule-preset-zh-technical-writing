import TextLintTester from 'textlint-tester';
import ruleObject from '../src/rules/token/no-space-between-zh-and-num-symbol.rule';
import { makeLintingRuleWith, toInvalidTestCase, toValidTestCase } from './utils';

const PLAIN_TEXT_CASES = [
  ['已经 200% 了', '已经 200  % 了', '数字与单位符号之间不需要添加空格', 7],
  ['摄氏度的符号是℃']
];

const MARKDOWN_CASES = [];

const tester = new TextLintTester();
const rule = makeLintingRuleWith({ tokenBasedRules: [ruleObject] });

tester.run('no-space-between-zh-and-num-symbol valid cases', rule, {
  valid: [...toValidTestCase('.txt', PLAIN_TEXT_CASES), ...toValidTestCase('.md', MARKDOWN_CASES)]
});

tester.run('no-space-between-zh-and-num-symbol invalid cases', rule, {
  invalid: [...toInvalidTestCase('.txt', PLAIN_TEXT_CASES), ...toInvalidTestCase('.md', MARKDOWN_CASES)]
});
