import { checkNode } from 'textlint-util-zh';

export function withRules(configList) {
  if (!Array.isArray(configList)) {
    throw new Error(`invalid config list, expected array, got: ${JSON.stringify(configList)}`);
  }
  const rules = configList.map((item) => resolveRule(item));
  return {
    linter: (context) => entry(rules, context),
    fixer: (context) => entry(rules, context)
  };
}

function resolveRule(configItem) {
  if (typeof configItem === 'string') {
    const rule = require(`textlint-rule-zh-${configItem}`);
    if (!rule) {
      throw new Error(`missing package for rule '${configItem}'`);
    }
    return rule;
  }

  if (configItem && typeof configItem === 'object') {
    const rule = require(`textlint-rule-zh-${configItem.name}`);
    if (!rule) {
      throw new Error(`missing package for rule '${configItem}'`);
    }
    if (typeof rule !== 'function') {
      throw new Error(`package for rule '${configItem.name}' does not accept any configuration`);
    }
    if (!configItem.config || typeof configItem.config !== 'object' || Array.isArray(configItem.config)) {
      throw new Error(`invalid config object for rule '${configItem.name}', got: ${JSON.stringify(configItem.config)}`);
    }
    return rule(configItem.config);
  }

  throw new Error(`invalid package for rule '${configItem.name}'`);
}

function entry(rules, context) {
  const { Syntax } = context;
  return {
    [Syntax.Code](node) {
      checkNode(rules, context, node);
    },
    [Syntax.Str](node) {
      checkNode(rules, context, node);
    }
  };
}
