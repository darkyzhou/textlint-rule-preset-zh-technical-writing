# textlint-rule-zh-double-zh-ellipsis

[textlint-rule-preset-zh-technical-writing](https://github.com/darkyzhou/textlint-rule-preset-zh-technical-writing) 提供的适用于中文技术文档写作的 [textlint](https://github.com/textlint/textlint) 规则，用于检测文本中使用的省略号是否符合规范。

## 规则介绍

> 中文省略号的形式为“……”，有六个小圆点，占两个汉字的宽度。一般而言，中文语境中禁止使用英文省略号，即三个小圆点“…”（占一个汉字的宽度），必须使用六个小圆点“……”。

在大多数中文输入法中，可以使用 <kbd>Shift</kbd> + <kbd>6</kbd> 来打出中文省略号。

本规则可被自动修复，可以向 textlint 传递 `--fix` 参数来自动修复文本中出现的错误。为了方便，你可以在书写文字时使用英文的省略号，或者是使用三个连续的英文句号，然后交给规则来自动修复为中文省略号。

### 通过规则的例子

```
泰拉世界……的人们……都这么……说话。

中枪的团长没有立刻倒下，而是转头说：“所以，请不要停下来……”
```

### 违反规则的例子

```
我…………这句话停顿了很久。

我…这句话停顿了一下下。

我...喜欢使用英文......省略号。
```

### 参考

本规则及介绍参考了[《中文技术文档写作风格指南》](https://zh-style-guide.readthedocs.io/zh_CN/latest/%E5%85%B3%E4%BA%8E%E6%9C%AC%E6%8C%87%E5%8D%97.html)中的[常用标点符号](https://zh-style-guide.readthedocs.io/zh_CN/latest/%E6%A0%87%E7%82%B9%E7%AC%A6%E5%8F%B7/%E5%B8%B8%E7%94%A8%E4%B8%AD%E6%96%87%E6%A0%87%E7%82%B9%E7%AC%A6%E5%8F%B7.html#id12)一节。

## 配置项

暂无。

## 提出 issue

如果你在使用本规则的过程中出现了误报，或者对本规则有任何疑问或者改进意见，欢迎[提出 issue](https://github.com/darkyzhou/textlint-rule-preset-zh-technical-writing/issues/new)。

## 使用方法

### 方法一：直接使用 textlint-rule-preset-zh-technical-writing

这是最简单的方法，参见 textlint-rule-preset-zh-technical-writing 的 [README](https://github.com/darkyzhou/textlint-rule-preset-zh-technical-writing#textlint-rule-preset-zh-technical-writing)。

### 方法二：手动安装

使用 npm 安装：

`npm install -g textlint-rule-zh-core textlint-rule-zh-double-zh-ellipsis`

创建 `entry.js`，名称任意：

```javascript
const { withRules } = require('textlint-rule-zh-core');
const correctlyOrderedPairs = require('textlint-rule-zh-double-zh-ellipsis');

// 这里 withRule(...) 的返回值就是你可以提供给 textlint 的 rule 对象
module.exports = withRules([correctlyOrderedPairs]);
```

运行 textlint：

`textlint --rulesdir <entry.js所在的文件夹路径> [其他参数] <要lint的文件名>`
