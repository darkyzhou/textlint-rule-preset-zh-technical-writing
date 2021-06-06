import ruleObject from '../../src/rules/token/no-space-around-zh-punct.rule';
import { runRuleTest } from '../utils';

const PLAIN_TEXT_CASES = [
  ['刚刚买了一部 iPhone，好开心！', '刚刚买了一部 iPhone， 好开心 ！', '全角标点与其他字符之间不需要添加空格', 14, 18],
  ['测试说：测试。', '测试说：  测试 。  ', '全角标点与其他字符之间不需要添加空格', 4, 8, 10]
];

const MARKDOWN_CASES = [];

runRuleTest({
  name: 'no-space-around-zh-punct',
  tokenBasedRules: [ruleObject],
  plainTextCases: PLAIN_TEXT_CASES,
  markdownCases: MARKDOWN_CASES
});
