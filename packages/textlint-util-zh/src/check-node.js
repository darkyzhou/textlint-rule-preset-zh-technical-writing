import { RuleHelper } from 'textlint-rule-helper';
import { toTokens } from './lexer';

export function checkNode(rules, context, node) {
  const { report } = context;
  const nodeRaw = node.raw;
  const nodeTypeInLowerCase = node.type.toLowerCase();
  const helper = new RuleHelper(context);
  const isCodeNode = node.type.toLowerCase() === 'code';
  const nodeBasedRules = rules.filter((rule) => rule?.type === 'node');
  const tokenBasedRules = rules.filter((rule) => !rule.type || rule.type === 'token');
  const errors = [];

  const appendToErrors = (result) => {
    // rule functions may return undefined, a RuleError
    // object, or an array of RuleError objects
    switch (true) {
      case Array.isArray(result):
        errors.push(...result);
        break;
      case result && typeof result === 'object':
        errors.push(result);
        break;
      default:
        throw new Error(`unknown return value ${JSON.stringify(result)}`);
    }
  };

  for (const rule of nodeBasedRules) {
    if (rule[nodeTypeInLowerCase]) {
      const result = rule[nodeTypeInLowerCase](context, node, helper);
      if (result) {
        appendToErrors(result);
      }
    }
  }

  if (!isCodeNode) {
    const tokens = toTokens(nodeRaw);
    tokens.forEach((currentToken, currentIndex) => {
      const type = currentToken.type;
      for (const rule of tokenBasedRules) {
        const ruleFunction = rule[type];
        if (typeof ruleFunction === 'function') {
          const result = ruleFunction.call(rule, {
            textLintCtx: context,
            node,
            currentToken,
            currentIndex,
            tokens,
            previousToken: tokens[currentIndex - 1], // may be 'undefined'
            nextToken: tokens[currentIndex + 1] // may be 'undefined'
          });
          if (result) {
            appendToErrors(result);
          }
        }
      }
    });
  }

  errors.forEach((error) => report(node, error));
}
