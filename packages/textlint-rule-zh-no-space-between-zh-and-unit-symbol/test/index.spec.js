import ruleObject from '../src';
import { runRuleTest } from 'textlint-test-util-zh';

const PLAIN_TEXT_CASES = [
  ['已经 200% 了', '已经 200  % 了', '数字与单位符号之间不需要添加空格', 7],
  ['摄氏度的符号是℃']
];

runRuleTest({
  name: 'no-space-between-zh-and-unit-symbol',
  rules: [ruleObject],
  plainTextFixableCases: PLAIN_TEXT_CASES
});
