# textlint-rule-zh-no-space-between-num-and-unit-symbol

[textlint-rule-preset-zh-technical-writing](https://github.com/darkyzhou/textlint-rule-preset-zh-technical-writing) 提供的适用于中文技术文档写作的 [textlint](https://github.com/textlint/textlint) 规则，用于检测并修复文本中数字和单位符号之间多余的空格。

## 规则介绍

本规则可被自动修复，可以向 textlint 传递 `--fix` 参数来自动修复文本中出现的错误。

### 通过规则的例子

```
Ontel 宣称新一代的酷睿 CPU 将有高达 0.05% 的性能提升！

今天的气温是 70℃，哦对不起看错单位了，是 21℃。
```

### 违反规则的例子

```
Ontel 宣称新一代的酷睿 CPU 将有高达 0.05 % 的性能提升！

今天的气温是 70 ℃，哦对不起看错单位了，是 21 ℃。
```

## 配置项

暂无。

## 提出 issue

如果你在使用本规则的过程中出现了误报，或者对本规则有任何疑问或者改进意见，欢迎[提出 issue](https://github.com/darkyzhou/textlint-rule-preset-zh-technical-writing/issues/new)。

## 使用方法

### 方法一：直接使用 textlint-rule-preset-zh-technical-writing

这是最简单的方法，参见 textlint-rule-preset-zh-technical-writing 的 [README](https://github.com/darkyzhou/textlint-rule-preset-zh-technical-writing#textlint-rule-preset-zh-technical-writing)。

### 方法二：手动安装

使用 npm 安装：

`npm install -g textlint-rule-zh-core textlint-rule-zh-no-space-between-num-and-unit-symbol`

创建 `entry.js`，名称任意：

```javascript
const { withRules } = require('textlint-rule-zh-core');
const correctlyOrderedPairs = require('textlint-rule-zh-no-space-between-num-and-unit-symbol');

// 这里 withRule(...) 的返回值就是你可以提供给 textlint 的 rule 对象
module.exports = withRules([correctlyOrderedPairs]);
```

运行 textlint：

`textlint --rulesdir <entry.js所在的文件夹路径> [其他参数] <要lint的文件名>`
