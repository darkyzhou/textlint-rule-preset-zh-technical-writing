import tokenBasedRules from './rules/token/*';
import nodeBasedRules from './rules/node/*';
import { runLexerOnString } from 'textlint-util-zh';
import { RuleHelper } from 'textlint-rule-helper';

const TOKEN_BASED_RULE_OBJECTS = Object.values(tokenBasedRules);
const NODE_BASED_RULE_OBJECTS = Object.values(nodeBasedRules);

export default (context) => {
  const { Syntax } = context;

  return {
    [Syntax.Code](node) {
      doCheck(context, node);
    },
    [Syntax.Str](node) {
      doCheck(context, node);
    }
  };
};

function doCheck(context, node) {
  const { report } = context;
  const value = node.value;
  const nodeTypeInLowerCase = node.type.toLowerCase();
  const helper = new RuleHelper(context);
  const errors = [];

  for (const rule of NODE_BASED_RULE_OBJECTS) {
    if (rule[nodeTypeInLowerCase]) {
      const error = rule[nodeTypeInLowerCase](context, node, helper);
      if (error) {
        errors.push(error);
      }
    }
  }

  runLexerOnString(value, ({ topToken, tokens }) => {
    const type = topToken.type;

    for (const rule of TOKEN_BASED_RULE_OBJECTS) {
      if (rule[type]) {
        const error = rule[type](context, node, topToken, tokens);
        if (error) {
          errors.push(error);
        }
      }
    }
  });

  // rule functions may return either a single RuleError
  // object or an array of RuleError objects
  errors.flat().forEach((error) => report(node, error));
}
