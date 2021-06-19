import { runRuleTest } from 'textlint-test-util-zh';
import ruleObject from '../src';

const PLAIN_TEXT_CASES = [
  ['这是一段 Test 文本', '这是一段Test文本', '中文与英文之间需要添加空格', 3, 8],
  ['Test'],
  ['Test 文本', 'Test文本', '中文与英文之间需要添加空格', 4],
  ['文本 Test', '文本Test', '中文与英文之间需要添加空格', 1],
  ['刚刚买了一部\niPhone'],
  ['今天出去买菜花了 5000 元。', '今天出去买菜花了5000元。', '中文与数字之间需要添加空格', 7, 12],
  ['5000'],
  ['5000 元', '5000元', '中文与数字之间需要添加空格', 4],
  ['第 5000', '第5000', '中文与数字之间需要添加空格', 0],
  ['5000\n元'],
  ['测试/测试']
];

const MARKDOWN_CASES = [
  ['测试\n[Test Image](https://example.com)'],
  [
    '**测试** [Test Image](https://example.com) 测试',
    '**测试**[Test Image](https://example.com)测试',
    '中文与英文之间需要添加空格',
    6,
    17
  ],
  ['测试![Test](https://example.com)'],
  ['# 测试!\n[Test](https://example.com)'],
  ['- 测试!\n- [Test](https://example.com)'],
  [
    '[测试](https://example.com) [Test Image](https://example.com) 测试',
    '[测试](https://example.com)[Test Image](https://example.com)测试',
    '中文与英文之间需要添加空格',
    25,
    36
  ],
  ['233 [测试](https://example.com) 233', '233[测试](https://example.com)233', '中文与数字之间需要添加空格', 3, 27],
  ['测试 3 测试', '测试3测试', '中文与数字之间需要添加空格', 1, 3]
];

runRuleTest({
  name: 'space-between-zh-and-en-or-num',
  rules: [ruleObject],
  plainTextFixableCases: PLAIN_TEXT_CASES,
  markdownFixableCases: MARKDOWN_CASES
});
