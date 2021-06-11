import ruleObject from '../src';
import { runRuleTest } from 'textlint-util-zh';

const PLAIN_TEXT_CASES = [
  ['刚刚买了一部 iPhone，好开心！', '刚刚买了一部 iPhone， 好开心 ！', '全角标点与其他字符之间不需要添加空格', 14, 18],
  ['测试说：测试。', '测试说：  测试 。', '全角标点与其他字符之间不需要添加空格', 4, 8]
];

runRuleTest({
  name: 'no-space-around-zh-punct',
  rules: [ruleObject],
  plainTextFixableCases: PLAIN_TEXT_CASES
});
