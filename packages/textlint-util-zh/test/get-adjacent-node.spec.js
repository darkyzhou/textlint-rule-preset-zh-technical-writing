import { textlint } from 'textlint';
import { RuleHelper } from 'textlint-rule-helper';
import { getLeftAdjacentNode, getRightAdjacentNode } from '../src';
import assert from 'assert';

const LEFT_CASES = [
  ['TEST1\n\n`TEST2`', 'TEST1'],
  ['TEST1\n\n**`TEST2`**', 'TEST1']
];

const RIGHT_CASES = [
  ['TEST1\n\n`TEST2`TEST3', 'TEST3'],
  ['TEST1\n\n**`TEST2`**\n\nTEST4', 'TEST4']
];

let result;
describe('get-adjacent-node', function () {
  afterEach(function () {
    result = null;
  });

  describe('#getLeftAdjacentNode()', function () {
    before(function () {
      textlint.setupRules({
        test: (context) => {
          const helper = new RuleHelper(context);
          return {
            Code: (node) => {
              result = getLeftAdjacentNode(helper, node);
            }
          };
        }
      });
    });

    after(function () {
      textlint.resetRules();
      textlint.setupRules({
        test: (context) => {
          const helper = new RuleHelper(context);
          return {
            Code: (node) => {
              result = getRightAdjacentNode(helper, node);
            }
          };
        }
      });
    });

    for (const [text, expectedNodeRaw] of LEFT_CASES) {
      it(`should return node(raw:${expectedNodeRaw}) given text ${text}`, function () {
        return textlint.lintMarkdown(text).then(() => {
          assert.ok(result, 'returned node should exist');
          assert.deepStrictEqual(result.raw, expectedNodeRaw);
        });
      });
    }
  });

  describe('#getRightAdjacentNode()', function () {
    for (const [text, expectedNodeRaw] of RIGHT_CASES) {
      it(`should return node(raw:${expectedNodeRaw}) given text ${text}`, function () {
        return textlint.lintMarkdown(text).then(() => {
          assert.ok(result, 'returned node should exist');
          assert.deepStrictEqual(result.raw, expectedNodeRaw);
        });
      });
    }
  });
});
