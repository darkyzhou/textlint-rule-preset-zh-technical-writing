import { withRules } from '../src';
import assert from 'assert';
import { textlint } from 'textlint';

describe('core', function () {
  describe('#withRules()', function () {
    describe('with invalid arguments', function () {
      it('should throw an error with `{}` input', function () {
        assert.throws(() => withRules({}), /invalid rules: an array is required/);
      });
      it('should throw an Error with `null` input', function () {
        assert.throws(() => withRules(null), /invalid rules: an array is required/);
      });
      it('should throw an Error with `undefined` input', function () {
        assert.throws(() => withRules(undefined), /invalid rules: an array is required/);
      });
      it('should throw an Error with `() => {}` input', function () {
        assert.throws(() => withRules(() => {}), /invalid rules: an array is required/);
      });
      it('should throw an Error with `[() => {}]` input', function () {
        assert.throws(() => withRules([() => {}]), /invalid rule config:/);
      });
    });

    afterEach(function () {
      textlint.resetRules();
    });

    describe('with unconfigurable rules', function () {
      it('should work correctly with both token-based and node-based rules', function () {
        let flag1 = false;
        let flag2 = false;
        const rule1 = {
          en_char: () => {
            flag1 = true;
          }
        };
        const rule2 = {
          type: 'node',
          Str: () => {
            flag2 = true;
          }
        };
        textlint.setupRules(withRules([rule1, rule2]));
        return textlint.lintMarkdown('TEST').then(() => {
          assert.deepStrictEqual(flag1, true);
          assert.deepStrictEqual(flag2, true);
        });
      });
    });

    describe('with configurable rules', function () {
      it('should work correctly with both token-based and node-based rules', function () {
        let receivedConfig1, receivedConfig2;
        const rule1 = (config) => ({
          en_char: () => {
            receivedConfig1 = config;
          }
        });
        const rule2 = (config) => ({
          type: 'node',
          Document: () => {
            receivedConfig2 = config;
          }
        });
        textlint.setupRules(withRules([rule1('test-config-1'), rule2('test-config-2')]));
        return textlint.lintMarkdown('TEST').then(() => {
          assert.deepStrictEqual(receivedConfig1, 'test-config-1');
          assert.deepStrictEqual(receivedConfig2, 'test-config-2');
        });
      });
    });
  });
});
