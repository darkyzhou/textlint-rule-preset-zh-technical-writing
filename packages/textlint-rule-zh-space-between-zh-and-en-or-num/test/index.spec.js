import { runRuleTest } from 'textlint-util-zh';
import ruleObject from '../src';

const PLAIN_TEXT_CASES = [
  ['这是一段 Test 文本', '这是一段Test文本', '中文与英文之间需要添加空格', 4, 7],
  ['Test'],
  ['Test 文本', 'Test文本', '中文与英文之间需要添加空格', 3],
  ['文本 Test', '文本Test', '中文与英文之间需要添加空格', 2],
  ['刚刚买了一部\niPhone'],
  ['今天出去买菜花了 5000 元。', '今天出去买菜花了5000元。', '中文与数字之间需要添加空格', 8, 11],
  ['5000'],
  ['5000 元', '5000元', '中文与数字之间需要添加空格', 3],
  ['第 5000', '第5000', '中文与数字之间需要添加空格', 1],
  ['5000\n元']
];

const MARKDOWN_CASES = [
  ['测试\n[Test Image](https://example.com)'],
  [
    '**测试** [Test Image](https://example.com) 测试',
    '**测试**[Test Image](https://example.com)测试',
    '中文与英文之间需要添加空格',
    7,
    16
  ],
  ['测试![Test](https://example.com)'],
  ['# 测试!\n[Test](https://example.com)'],
  ['- 测试!\n- [Test](https://example.com)'],
  [
    '[测试](https://example.com) [Test Image](https://example.com) 测试',
    '[测试](https://example.com)[Test Image](https://example.com)测试',
    '中文与英文之间需要添加空格',
    26,
    35
  ],
  ['233 [测试](https://example.com) 233', '233[测试](https://example.com)233', '中文与数字之间需要添加空格', 2, 28]
];

runRuleTest({
  name: 'space-between-zh-and-en-or-num',
  rules: [ruleObject],
  plainTextFixableCases: PLAIN_TEXT_CASES,
  markdownFixableCases: MARKDOWN_CASES
});
