# textlint-rule-zh-no-space-around-zh-punct

[textlint-rule-preset-zh-technical-writing](https://github.com/darkyzhou/textlint-rule-preset-zh-technical-writing) 提供的适用于中文技术文档写作的 [textlint](https://github.com/textlint/textlint) 规则，用于检测并修复文本中标点符号周围多余的空格。

## 规则介绍

本规则可被自动修复，可以向 textlint 传递 `--fix` 参数来自动修复文本中出现的错误。

### 通过规则的例子

```
我，正常地speak。
```

### 违反规则的例子

```
我 ， 不正常地speak 。
```

### 参考

本规则及介绍参考了[《中文文案排版指北》](https://github.com/mzlogin/chinese-copywriting-guidelines#%E4%B8%AD%E6%96%87%E6%96%87%E6%A1%88%E6%8E%92%E7%89%88%E6%8C%87%E5%8C%97)中的[全角标点与其他字符之间不加空格](https://github.com/mzlogin/chinese-copywriting-guidelines#%E5%85%A8%E8%A7%92%E6%A0%87%E7%82%B9%E4%B8%8E%E5%85%B6%E4%BB%96%E5%AD%97%E7%AC%A6%E4%B9%8B%E9%97%B4%E4%B8%8D%E5%8A%A0%E7%A9%BA%E6%A0%BC)一节。

## 配置项

暂无。

## 提出 issue

如果你在使用本规则的过程中出现了误报，或者对本规则有任何疑问或者改进意见，欢迎[提出 issue](https://github.com/darkyzhou/textlint-rule-preset-zh-technical-writing/issues/new)。

## 使用方法

### 方法一：直接使用 textlint-rule-preset-zh-technical-writing

这是最简单的方法，参见 textlint-rule-preset-zh-technical-writing 的 [README](https://github.com/darkyzhou/textlint-rule-preset-zh-technical-writing#textlint-rule-preset-zh-technical-writing)。

### 方法二：手动安装

使用 npm 安装：

`npm install -g textlint-rule-zh-core textlint-rule-zh-no-space-around-zh-punct`

创建 `entry.js`，名称任意：

```javascript
const { withRules } = require('textlint-rule-zh-core');
const correctlyOrderedPairs = require('textlint-rule-zh-no-space-around-zh-punct');

// 这里 withRule(...) 的返回值就是你可以提供给 textlint 的 rule 对象
module.exports = withRules([correctlyOrderedPairs]);
```

运行 textlint：

`textlint --rulesdir <entry.js所在的文件夹路径> [其他参数] <要lint的文件名>`
