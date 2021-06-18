import { runRuleTest } from 'textlint-util-zh';
import ruleObject from '../src';

const PLAIN_TEXT_VALID_CASES = ['“测试‘Test’测试”', '《测试〈测试〉》'];

const PLAIN_TEXT_INVALID_CASES = [
  ['测试”测试', '标点符号的使用有误，此符号不应在此出现', 2],
  ['“测试’Test‘测试”', '标点符号的使用有误，此符号不应在此出现', 3],
  ['《测试〈测试〉“测试》', '标点符号的使用有误，此符号不应在《和》之间出现', 7],
  ['「测试《」', '标点符号的使用有误，此符号不应在「和」之间出现', 3],
  ['「测试」」', '标点符号的使用有误，此符号不应在此出现', 4]
];

runRuleTest({
  name: 'correctly-ordered-pairs',
  rules: [ruleObject],
  plainTextValidCases: PLAIN_TEXT_VALID_CASES,
  plainTextInvalidCases: PLAIN_TEXT_INVALID_CASES
});
