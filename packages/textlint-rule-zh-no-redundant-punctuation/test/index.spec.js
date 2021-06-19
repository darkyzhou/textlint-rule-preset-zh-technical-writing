import { runRuleTest } from 'textlint-test-util-zh';
import ruleObject from '../src';

const PLAIN_TEXT_VALID_CASES = [
  '德国队竟然战胜了巴西队！',
  '她竟然对你说「喵」？！',
  '他说：“Test。”',
  '他说：“Test说：‘Test。’”'
];

const PLAIN_TEXT_INVALID_CASES = [
  ['德国队竟然战胜了巴西队！！！！', '多余的标点符号', 11],
  ['她竟然对你说「喵」？！？！？？！！', '多余的标点符号', 11],
  ['测试，。', '多余的标点符号', 2]
];

runRuleTest({
  name: 'no-redundant-punctuation',
  rules: [ruleObject],
  plainTextValidCases: PLAIN_TEXT_VALID_CASES,
  plainTextInvalidCases: PLAIN_TEXT_INVALID_CASES
});
