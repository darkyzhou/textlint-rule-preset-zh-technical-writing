import { runRuleTest } from 'textlint-util-zh';
import ruleObject from '../src';

const MARKDOWN_CASES = [
  ['测试 `code` 代码', '测试`code`代码', '行内代码块周围需要添加空格', 2, 7],
  ['测试 ```code``` 代码', '测试```code```代码', '行内代码块周围需要添加空格', 2, 11],
  ['`code` 代码', '`code`代码', '行内代码块周围需要添加空格', 5]
];

runRuleTest({
  name: 'space-around-inline-code',
  rules: [ruleObject],
  markdownFixableCases: MARKDOWN_CASES
});
