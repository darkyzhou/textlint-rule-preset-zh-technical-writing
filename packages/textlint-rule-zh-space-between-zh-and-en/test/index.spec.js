import { runRuleTest } from 'textlint-util-zh';
import ruleObject from '../src';

const PLAIN_TEXT_CASES = [
  ['这是一段 Test 文本', '这是一段Test文本', '中文与英文之间需要添加空格', 4, 7],
  ['Test'],
  ['Test 文本', 'Test文本', '中文与英文之间需要添加空格', 3],
  ['文本 Test', '文本Test', '中文与英文之间需要添加空格', 2],
  ['刚刚买了一部\niPhone']
];

const MARKDOWN_CASES = ['刚刚买了一部\niPhone'];

runRuleTest({
  name: 'space-between-zh-and-en',
  tokenBasedRules: [ruleObject],
  plainTextFixableCases: PLAIN_TEXT_CASES,
  markdownValidCases: MARKDOWN_CASES
});
