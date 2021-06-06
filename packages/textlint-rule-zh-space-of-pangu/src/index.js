import tokenBasedRules from './rules/token/*';
import nodeBasedRules from './rules/node/*';
import { checkNode } from 'textlint-util-zh';

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
      checkNode(ruleObjects, context, node);
    },
    [Syntax.Str](node) {
      checkNode(ruleObjects, context, node);
    }
  };
}
