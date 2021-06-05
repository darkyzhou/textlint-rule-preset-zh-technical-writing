import TextLintTester from 'textlint-tester';
import ruleObject from '../src/rules/token/no-space-around-zh-punct.rule';
import { makeLintingRuleWith, toInvalidTestCase, toValidTestCase } from './utils';

const PLAIN_TEXT_CASES = [
  ['刚刚买了一部 iPhone，好开心！', '刚刚买了一部 iPhone， 好开心 ！', '全角标点与其他字符之间不需要添加空格', 14, 18],
  ['测试说：测试。', '测试说：  测试 。  ', '全角标点与其他字符之间不需要添加空格', 4, 8, 10]
];

const MARKDOWN_CASES = [];

const tester = new TextLintTester();
const rule = makeLintingRuleWith({ tokenBasedRules: [ruleObject] });

tester.run('no-space-around-zh-punct valid cases', rule, {
  valid: [...toValidTestCase('.txt', PLAIN_TEXT_CASES), ...toValidTestCase('.md', MARKDOWN_CASES)]
});

tester.run('no-space-around-zh-punct invalid cases', rule, {
  invalid: [...toInvalidTestCase('.txt', PLAIN_TEXT_CASES), ...toInvalidTestCase('.md', MARKDOWN_CASES)]
});
