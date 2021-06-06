import ruleObject from '../src/rules/token/no-space-between-zh-and-num-symbol.rule';
import { runRuleTest } from './utils';

const PLAIN_TEXT_CASES = [
  ['已经 200% 了', '已经 200  % 了', '数字与单位符号之间不需要添加空格', 7],
  ['摄氏度的符号是℃']
];

const MARKDOWN_CASES = [];

runRuleTest({
  name: 'no-space-between-zh-and-num-symbol',
  tokenBasedRules: [ruleObject],
  plainTextCases: PLAIN_TEXT_CASES,
  markdownCases: MARKDOWN_CASES
});
