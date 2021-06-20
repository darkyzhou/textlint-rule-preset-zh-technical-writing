# textlint-rule-zh-core

[textlint-rule-zh 系列规则](https://github.com/darkyzhou/textlint-rule-preset-zh-technical-writing/tree/main/packages)的核心包，只有搭配它使用才能让 textlint 正确加载规则。

## 使用方法

### 安装核心包以及要使用的规则包

这里以 [textlint-rule-zh-correctly-ordered-pairs](https://github.com/darkyzhou/textlint-rule-preset-zh-technical-writing/tree/main/packages/textlint-rule-zh-correctly-ordered-pairs) 为例：

`npm install -g textlint-rule-zh-core textlint-rule-zh-correctly-ordered-pairs`

### 获得 textlint rule

```javascript
import { withRules } from 'textlint-rule-zh-core';
import correctlyOrderedPairs from 'textlint-rule-zh-correctly-ordered-pairs';
import { textlint } from 'textlint';

const rule = withRules([correctlyOrderedPairs]);
textlint.setupRules(rule);
```
