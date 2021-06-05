import { doCheck } from '../src';

export function makeLintingRuleWith({ nodeBasedRules = [], tokenBasedRules = [] }) {
  const entry = (context) => {
    const { Syntax } = context;
    const ruleObjects = {
      nodeBased: nodeBasedRules,
      tokenBased: tokenBasedRules
    };

    return {
      [Syntax.Code](node) {
        doCheck(ruleObjects, context, node);
      },
      [Syntax.Str](node) {
        doCheck(ruleObjects, context, node);
      }
    };
  };
  return {
    linter: entry,
    fixer: entry
  };
}

export function toValidTestCase(ext, arrayInput) {
  return arrayInput.map(([valid]) => ({ ext, text: valid }));
}

export function toInvalidTestCase(ext, arrayInput) {
  return arrayInput.map(([fixedOutput, invalid, ...errors]) => ({
    ext,
    output: fixedOutput,
    text: invalid,
    errors: toTesterErrorObject(errors)
  }));
}

function toTesterErrorObject(caseErrors) {
  const errors = [];
  let message;

  for (const element of caseErrors) {
    if (!message) {
      if (typeof element !== 'string') {
        throw new Error('invalid test case data: should start with a message string');
      }
      message = element;
    }

    switch (typeof element) {
      case 'number':
        errors.push({
          message,
          index: element
        });
        break;
      case 'string':
        message = element;
        break;
      default:
        throw new Error('invalid test case data: unsupported data type');
    }
  }

  return errors;
}
