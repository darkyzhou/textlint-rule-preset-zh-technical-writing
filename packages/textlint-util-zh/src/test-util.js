import TextLintTester from 'textlint-tester';
import { markTextLintRuleEntry } from './make-textlint-rule-entry';

export function runRuleTest({
  name,
  rules,
  plainTextFixableCases = [],
  plainTextValidCases = [],
  plainTextInvalidCases = [],
  markdownFixableCases = [],
  markdownValidCases = [],
  markdownInvalidCases = []
}) {
  const tester = new TextLintTester();
  const rule = markTextLintRuleEntry(rules);

  function parseFixableValidTestCases(ext, cases) {
    return cases.filter(([valid]) => valid).map(([valid]) => ({ ext, text: valid }));
  }

  function parseValidTestCases(ext, cases) {
    return cases.map((valid) => ({ ext, text: valid }));
  }

  function parseFixableInvalidCases(ext, cases) {
    return cases
      .filter(([_, ...others]) => others.length > 0)
      .map(([fixedOutput, invalid, ...errors]) => ({
        ext,
        output: fixedOutput,
        text: invalid,
        errors: toTesterErrorObject(errors)
      }));
  }

  function parseInvalidCases(ext, cases) {
    return cases
      .filter(([_, ...others]) => others.length > 0)
      .map(([invalid, ...errors]) => ({
        ext,
        text: invalid,
        errors: toTesterErrorObject(errors)
      }));
  }

  describe(`${name}`, function () {
    describe('plain text', function () {
      tester.run('valid cases', rule, {
        valid: [
          ...parseFixableValidTestCases('.txt', plainTextFixableCases),
          ...parseValidTestCases('.txt', plainTextValidCases)
        ]
      });

      tester.run('invalid cases', rule, {
        invalid: [
          ...parseFixableInvalidCases('.txt', plainTextFixableCases),
          ...parseInvalidCases('.txt', plainTextInvalidCases)
        ]
      });
    });

    describe('markdown', function () {
      tester.run('valid cases', rule, {
        valid: [
          ...parseFixableValidTestCases('.md', markdownFixableCases),
          ...parseValidTestCases('.md', markdownValidCases)
        ]
      });

      tester.run('invalid cases', rule, {
        invalid: [
          ...parseFixableInvalidCases('.md', markdownFixableCases),
          ...parseInvalidCases('.md', markdownInvalidCases)
        ]
      });
    });
  });
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
