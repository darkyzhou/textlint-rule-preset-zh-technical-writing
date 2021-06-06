import { doCheck } from '../src';
import TextLintTester from 'textlint-tester';

export function runRuleTest({ name, nodeBasedRules, tokenBasedRules, plainTextCases = [], markdownCases = [] }) {
  const tester = new TextLintTester();
  const rule = makeLintingRuleWith({ nodeBasedRules, tokenBasedRules });

  describe(`${name}`, function () {
    tester.run('valid cases', rule, {
      valid: [...toValidTestCase('.txt', plainTextCases), ...toValidTestCase('.md', markdownCases)]
    });

    tester.run('invalid cases', rule, {
      invalid: [...toInvalidTestCase('.txt', plainTextCases), ...toInvalidTestCase('.md', markdownCases)]
    });
  });
}

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
  return arrayInput.filter(([valid]) => valid).map(([valid]) => ({ ext, text: valid }));
}

export function toInvalidTestCase(ext, arrayInput) {
  return arrayInput
    .filter(([_, ...others]) => others.length > 0)
    .map(([fixedOutput, invalid, ...errors]) => ({
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
