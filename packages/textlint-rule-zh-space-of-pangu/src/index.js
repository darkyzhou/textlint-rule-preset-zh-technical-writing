import tokenBasedRules from './rules/token/*';
import nodeBasedRules from './rules/node/*';
import { runLexerOnString } from 'textlint-util-zh';
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
    runLexerOnString(nodeRaw, ({ topToken, tokens }) => {
      const type = topToken.type;

      for (const rule of ruleObjects.tokenBased) {
        if (rule[type]) {
          const error = rule[type](context, node, topToken, tokens);
          if (error) {
            errors.push(error);
          }
        }
      }
    });
  }

  // rule functions may return either a single RuleError
  // object or an array of RuleError objects
  errors.flat().forEach((error) => report(node, error));
}
