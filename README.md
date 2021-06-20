<h2 align="center">textlint-rule-preset-zh-technical-writing</h2>
<p align="center">
  <img alt="npm" src="https://img.shields.io/npm/v/textlint-rule-preset-zh-technical-writing">
  <a href="https://lerna.js.org/"><img alt="Maintained with lerna" src="https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg"></a>
  <a href="http://commitizen.github.io/cz-cli/"><img alt="Commitizen friendly" src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg"></a>
  <img alt="npm" src="https://img.shields.io/npm/dw/textlint-rule-preset-zh-technical-writing">
  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/darkyzhou/textlint-rule-preset-zh-technical-writing?style=social">
</p>

## 简介

本项目是适用于中文技术文档写作的 [textlint](https://github.com/textlint/textlint) 规则预设方案，包含多种规则以检查文本中是否存在一些错误，其中多数规则附带修复功能，可供用户一键修复错误。

如果你有好的建议或疑问，欢迎[发表 issue](https://github.com/darkyzhou/textlint-rule-preset-zh-technical-writing/issues/new)。

## 需求

本项目需要：

- v6.0.0 及以上版本的 Node.js（如果使用 Node.js 运行）
- v5.0.0 及以上的 npm
- v12.0.0 以上的 textlint

## 规则列表

目前，本预设方案包含以下的规则，其中标有 
[![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/) 的为可以进行自动修复的规则。

> 如果你有其他规则的需求，欢迎[发表 issue](https://github.com/darkyzhou/textlint-rule-preset-zh-technical-writing/issues/new)。

| 名称                                                         | 介绍                                                         |                                                              |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| [textlint-rule-zh-correctly-ordered-pairs](https://github.com/darkyzhou/textlint-rule-preset-zh-technical-writing/tree/main/packages/textlint-rule-zh-correctly-ordered-pairs) | 检测像引号、书名号这些需要成对按顺序使用的标点符号在文本中是否被正确使用 |                                                              |
| [textlint-rule-zh-double-zh-ellipsis](https://github.com/darkyzhou/textlint-rule-preset-zh-technical-writing/tree/main/packages/textlint-rule-zh-double-zh-ellipsis) | 检测文本中使用的省略号是否符合规范                           | [![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/) |
| [textlint-rule-zh-no-redundant-punctuation](https://github.com/darkyzhou/textlint-rule-preset-zh-technical-writing/tree/main/packages/textlint-rule-zh-no-redundant-punctuation) | 检测文本中是否出现了多余的标点符号                           |                                                              |
| [textlint-rule-zh-no-redundant-space-around-token](https://github.com/darkyzhou/textlint-rule-preset-zh-technical-writing/tree/main/packages/textlint-rule-zh-no-redundant-space-around-token) | 检测并修复文本中多余的空格                                   | [![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/) |
| [textlint-rule-zh-no-space-around-zh-punct](https://github.com/darkyzhou/textlint-rule-preset-zh-technical-writing/tree/main/packages/textlint-rule-zh-no-space-around-zh-punct) | 检测并修复文本中标点符号周围多余的空格                       | [![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/) |
| [textlint-rule-zh-no-space-between-num-and-unit-symbol](https://github.com/darkyzhou/textlint-rule-preset-zh-technical-writing/tree/main/packages/textlint-rule-zh-no-space-between-num-and-unit-symbol) | 检测并修复文本中数字和单位符号之间多余的空格                 | [![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/) |
| [textlint-rule-zh-space-around-inline-code](https://github.com/darkyzhou/textlint-rule-preset-zh-technical-writing/tree/main/packages/textlint-rule-zh-space-around-inline-code) | 检测并修复 Markdown 文本中行内代码周围缺失的空格             | [![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/) |
| [textlint-rule-zh-space-between-zh-and-en-or-num](https://github.com/darkyzhou/textlint-rule-preset-zh-technical-writing/tree/main/packages/textlint-rule-zh-space-between-zh-and-en-or-num) | 检测并修复汉字与英文、数字之间缺失的空格                     | [![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/) |
| [textlint-rule-terminology](https://github.com/sapegin/textlint-rule-terminology) | 检测并修复误用的英文术语                                     | [![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/) |
| [textlint-rule-no-invalid-control-character](https://github.com/textlint-rule/textlint-rule-no-invalid-control-character) | 检测并修复文本中出现的无效的控制字符                         | [![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/) |

## 使用方法

目前，textlint **仅支持 `.txt` 格式的纯文本和 `.md` 格式的 Markdown 文本**，如果尝试将它用到 `.html` 文件中，可能出现难以预料的后果。

> 如果你在使用过程中对某个规则有疑问，请参考它对应的 README，[packges](https://github.com/darkyzhou/textlint-rule-preset-zh-technical-writing/tree/main/packages) 文件夹里包含所有规则的源码，其中也包含 README。
> 如果你觉得你遇到了误判，欢迎[发表 issue](https://github.com/darkyzhou/textlint-rule-preset-zh-technical-writing/issues/new)。

### 使用 textlint 命令行工具

textlint 提供了一套命令行工具，可供用户直接在命令行里使用本预设：

1. 安装 textlint 和本预设：`npm install -g textlint textlint-rule-preset-zh-technical-writing`

2. 运行 textlint：`textlint --preset textlint-rule-preset-zh-technical-writing --fix <要lint的文件名>`

3. 你的文件此时会被 textlint 结合本预设进行 lint，其中出现的部分错误会被自动修复，但有些错误需要人工修复。请仔细查看控制台输出的内容。

textlint 命令行工具提供许多额外的选项，请使用 `textlint --help` 来查看。

### 使用浏览器插件

WIP，等我几天。

## 误判问题

本项目处于早期阶段，可能存在不少 Bug。如果你遇到了规则误判的问题，除了发表 issue 之外，可以临时通过以下方法让 textlint 忽略你的部分文本：

```
<!-- textlint-disable -->你要忽略的文本<!-- textlint-enable -->
```

## 本地开发

若要参与本项目的开发，请执行以下步骤：

### 初始化仓库

1. 克隆本仓库，使用像 `git clone` 这样的命令。
2. 如果你没有安装 `yarn`，请执行 `npm install -g yarn`。
3. 执行 `yarn`。

### 测试

在仓库**根目录**下运行 `yarn test`。

### 编译

本项目使用 [babel](https://github.com/babel/babel) 来转换源码中的 ES6 模块语法，以及嵌入 Node.js v6.0.0 的 polyfill（基于 [core-js](https://github.com/zloirock/core-js)）。

同时，本项目使用 [lerna](https://github.com/lerna/lerna) 管理，因此在本地测试时，`packages` 文件夹里的包之间的依赖，是通过在项目根目录下的 `node_modules` 文件夹里的软链接来实现的。

例如，`textlint-rule-zh-space-around-inline-code` 依赖的 `textlint-test-util-zh` 实际上是由 `node_modules/textlint-test-util-zh` 软链接指向 `packages/textlint-test-util-zh`。

通过执行 `yarn`，可以自动添加这样的软链接，而为了确保本地测试能够运行，并且你做的修改能够生效，在本地开发时推荐运行 `yarn build:watch` 来自动监视代码修改，实时编译。
