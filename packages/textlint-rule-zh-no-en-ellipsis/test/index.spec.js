import { runRuleTest } from 'textlint-util-zh';
import ruleObject from '../src';

const PLAIN_TEXT_FIXABLE_CASES = [
  ['测..试'],
  ['测……试', '测...试', '中文为主的文本下应该使用中文省略号', 1],
  ['测……试', '测....试', '中文为主的文本下应该使用中文省略号', 1],
  ['测……试', '测.....试', '中文为主的文本下应该使用中文省略号', 1],
  ['测……试', '测......试', '中文为主的文本下应该使用中文省略号', 1]
];

runRuleTest({
  name: 'no-en-ellipsis',
  rules: [ruleObject],
  plainTextFixableCases: PLAIN_TEXT_FIXABLE_CASES
});
