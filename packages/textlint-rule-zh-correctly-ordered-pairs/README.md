# textlint-rule-zh-correctly-ordered-pairs

[textlint-rule-preset-zh-technical-writing](https://github.com/darkyzhou/textlint-rule-preset-zh-technical-writing) 提供的适用于中文技术文档写作的 [textlint](https://github.com/textlint/textlint) 规则，用于检测像引号、书名号这些需要成对按顺序使用的标点符号在文本中是否被正确使用。

## 规则介绍

本规则不能自动修复，需要在报错提示下手动修复。

### 通过规则的例子

```
《关于〈关于某事项的说明〉的说明》

他说：「人被杀，就会死。」

只见那人大喊：“他曾说：‘我急了！’，现在我也急了！”
```

### 违反规则的例子

```
欠揍的小刚说：”我将在此示范，如何将你的关注引号顺序的朋友气到脑中风“

《关于我不小心在书名号里打了个“的事情》
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

`npm install -g textlint-rule-zh-core textlint-rule-zh-correctly-ordered-pairs`

创建 `entry.js`，名称任意：

```javascript
const { withRules } = require('textlint-rule-zh-core');
const correctlyOrderedPairs = require('textlint-rule-zh-correctly-ordered-pairs');

// 这里 withRule(...) 的返回值就是你可以提供给 textlint 的 rule 对象
module.exports = withRules([correctlyOrderedPairs]);
```

运行 textlint：

`textlint --rulesdir <entry.js所在的文件夹路径> [其他参数] <要lint的文件名>`
