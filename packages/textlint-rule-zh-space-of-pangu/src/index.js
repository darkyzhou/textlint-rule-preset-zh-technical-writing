import tokenBasedRules from './rules/token/*';
import nodeBasedRules from './rules/node/*';
import { toTokens } from 'textlint-util-zh';
import { RuleHelper } from 'textlint-rule-helper';

const TOKEN_BASED_RULE_OBJECTS = Object.values(tokenBasedRules);
const NODE_BASED_RULE_OBJECTS = Object.values(nodeBasedRules);

export default {
  linter: entry,
  fixer: entry
};

function entry(context) {
  const { Syntax } = context;
  const ruleObjects = {
    nodeBased: NODE_BASED_RULE_OBJECTS,
    tokenBased: TOKEN_BASED_RULE_OBJECTS
  };

  return {
    [Syntax.Code](node) {
      doCheck(ruleObjects, context, node, true);
    },
    [Syntax.Str](node) {
      doCheck(ruleObjects, context, node, false);
    }
  };
}

export function doCheck(
  ruleObjects = {
    nodeBased: [],
    tokenBased: []
  },
  context,
  node,
  isInCodeNode
) {
  const { report } = context;
  const nodeRaw = node.raw;
  const nodeTypeInLowerCase = node.type.toLowerCase();
  const helper = new RuleHelper(context);
  const errors = [];

  for (const rule of ruleObjects.nodeBased) {
    if (rule[nodeTypeInLowerCase]) {
      const error = rule[nodeTypeInLowerCase](context, node, helper);
      if (error) {
        errors.push(error);
      }
    }
  }

  if (!isInCodeNode) {
    const tokens = toTokens(nodeRaw);
    tokens.forEach((currentToken, currentIndex) => {
      const type = currentToken.type;
      for (const rule of ruleObjects.tokenBased) {
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

          // rule functions may return undefined, a RuleError
          // object, or an array of RuleError objects
          switch (true) {
            case !result:
              continue;
            case Array.isArray(result):
              errors.push(...result);
              break;
            case result && typeof result === 'object':
              errors.push(result);
              break;
            default:
              throw new Error(`unknown return value ${JSON.stringify(result)}`);
          }
        }
      }
    });
  }

  errors.forEach((error) => report(node, error));
}
