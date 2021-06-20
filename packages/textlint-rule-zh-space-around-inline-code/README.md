# textlint-rule-zh-space-around-inline-code

[textlint-rule-preset-zh-technical-writing](https://github.com/darkyzhou/textlint-rule-preset-zh-technical-writing) 提供的适用于中文技术文档写作的 [textlint](https://github.com/textlint/textlint) 规则，用于检测并修复 Markdown 文本中行内代码周围缺失的空格。

## 规则介绍

本规则类似于 [textlint-rule-zh-space-between-zh-and-en-or-num](https://github.com/darkyzhou/textlint-rule-preset-zh-technical-writing/tree/main/packages/textlint-rule-zh-space-between-zh-and-en-or-num)，在行内代码周围添加空格，在代码和汉字之间留出足够的缝隙，让文本看上去更加优雅、协调。

如果你想争论这样做的必要性，请允许我引用来自 [pangu.js](https://github.com/vinta/pangu.js) 的一段话：

> 漢學家稱這個空白字元為「盤古之白」，因為它劈開了全形字和半形字之間的混沌。另有研究顯示，打字的時候不喜歡在中文和英文之間加空格的人，感情路都走得很辛苦，有七成的比例會在 34 歲的時候跟自己不愛的人結婚，而其餘三成的人最後只能把遺產留給自己的貓。畢竟愛情跟書寫都需要適時地留白。

本规则可被自动修复，可以向 textlint 传递 `--fix` 参数来自动修复文本中出现的错误。

### 通过规则的例子

```
我们应该使用 `+new Date()` 而不是 `Date.now()` 来让我们的代码变得丑陋无比。

`import React from 'react';` 在 React v17 之后不再必要了。

值得一提的是，`inline code` 周围如果是标点符号，那么不需要加空格。
```

它们显示出来的效果：

我们应该使用 `+new Date()` 而不是 `Date.now()` 来让我们的代码变得丑陋无比。

`import React from 'react';` 在 React v17 之后不再必要了。

值得一提的是，`inline code` 周围如果是标点符号，那么不需要加空格。

### 违反规则的例子

```
我们应该使用`+new Date()`而不是`Date.now()`来让我们的代码变得丑陋无比。

`import React from 'react';`在 React v17 之后不再必要了。
```

它们显示出来的效果：

我们应该使用`+new Date()`而不是`Date.now()`来让我们的代码变得丑陋无比。

`import React from 'react';`在 React v17 之后不再必要了。

## 配置项

暂无。

## 提出 issue

如果你在使用本规则的过程中出现了误报，或者对本规则有任何疑问或者改进意见，欢迎[提出 issue](https://github.com/darkyzhou/textlint-rule-preset-zh-technical-writing/issues/new)。

## 使用方法

### 方法一：直接使用 textlint-rule-preset-zh-technical-writing

这是最简单的方法，参见 textlint-rule-preset-zh-technical-writing 的 [README](https://github.com/darkyzhou/textlint-rule-preset-zh-technical-writing#textlint-rule-preset-zh-technical-writing)。

### 方法二：手动安装

使用 npm 安装：

`npm install -g textlint-rule-zh-core textlint-rule-zh-space-around-inline-code`

创建 `entry.js`，名称任意：

```javascript
const { withRules } = require('textlint-rule-zh-core');
const correctlyOrderedPairs = require('textlint-rule-zh-space-around-inline-code');

// 这里 withRule(...) 的返回值就是你可以提供给 textlint 的 rule 对象
module.exports = withRules([correctlyOrderedPairs]);
```

运行 textlint：

`textlint --rulesdir <entry.js所在的文件夹路径> [其他参数] <要lint的文件名>`
