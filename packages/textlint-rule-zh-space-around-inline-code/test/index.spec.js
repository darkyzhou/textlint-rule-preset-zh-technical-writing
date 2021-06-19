import { runRuleTest } from 'textlint-test-util-zh';
import ruleObject from '../src';

const MARKDOWN_CASES = [
  ['测试 `code` 代码', '测试`code`代码', '行内代码块周围需要添加空格', 2, 7],
  ['测试，`code` 代码', '测试，`code`代码', '行内代码块周围需要添加空格', 8],
  ['测试 ```code``` 代码', '测试```code```代码', '行内代码块周围需要添加空格', 2, 11],
  ['`code` 代码', '`code`代码', '行内代码块周围需要添加空格', 5],
  ['Test\r\n`test` Code', 'Test\r\n`test`Code', '行内代码块周围需要添加空格', 11],
  ['Test\r\n\n`test` Code'],
  [
    'test [`test` test](https://example.com/)test',
    'test[`test`test](https://example.com/)test',
    '行内代码块周围需要添加空格',
    5,
    10
  ],
  ['test\n\n- `code`']
];

runRuleTest({
  name: 'space-around-inline-code',
  rules: [ruleObject],
  markdownFixableCases: MARKDOWN_CASES
});
