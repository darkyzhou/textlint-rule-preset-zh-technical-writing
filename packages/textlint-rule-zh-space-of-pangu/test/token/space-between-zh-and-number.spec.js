import { runRuleTest } from '../utils';
import ruleObject from '../../src/rules/token/space-between-zh-and-number.rule';

const PLAIN_TEXT_CASES = [
  ['今天出去买菜花了 5000 元。', '今天出去买菜花了5000元。', '中文与数字之间需要添加空格', 8, 11],
  ['5000'],
  ['5000 元', '5000元', '中文与数字之间需要添加空格', 3],
  ['第 5000', '第5000', '中文与数字之间需要添加空格', 1],
  ['5000\n元']
];

const MARKDOWN_CASES = [['5000\n元']];

runRuleTest({
  name: 'space-between-zh-and-number',
  tokenBasedRules: [ruleObject],
  plainTextCases: PLAIN_TEXT_CASES,
  markdownCases: MARKDOWN_CASES
});
