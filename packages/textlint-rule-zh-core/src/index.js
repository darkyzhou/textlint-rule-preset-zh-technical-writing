import { markTextLintRuleEntry } from 'textlint-util-zh';

export function withRules(rulesConfig) {
  if (!Array.isArray(rulesConfig)) {
    throw new Error('invalid rules: an array is required');
  }
  const rules = rulesConfig.map((item) => resolveRule(item));
  return markTextLintRuleEntry(rules);
}

function resolveRule(configItem) {
  if (configItem && typeof configItem === 'object') {
    return configItem;
  }

  throw new Error(`invalid rule config: ${JSON.stringify(configItem)}`);
}
