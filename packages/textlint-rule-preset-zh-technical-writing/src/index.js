import { withRules } from 'textlint-rule-zh-core';
import correctlyOrderedPairs from 'textlint-rule-zh-correctly-ordered-pairs';
import doubleZhEllipsis from 'textlint-rule-zh-double-zh-ellipsis';
import noRedundantPunctuation from 'textlint-rule-zh-no-redundant-punctuation';
import noRedundantSpaceAroundToken from 'textlint-rule-zh-no-redundant-space-around-token';
import noSpaceAroundZhPunct from 'textlint-rule-zh-no-space-around-zh-punct';
import noSpaceBetweenZhAndUnitSymbol from 'textlint-rule-zh-no-space-between-zh-and-unit-symbol';
import spaceAroundInlineCode from 'textlint-rule-zh-space-around-inline-code';
import spaceBetweenZhAndEnOrNum from 'textlint-rule-zh-space-between-zh-and-en-or-num';
import terminology from 'textlint-rule-terminology';
import noInvalidControlCharacter from '@textlint-rule/textlint-rule-no-invalid-control-character';

export default {
  rules: {
    zhRuleSeries: withRules([
      correctlyOrderedPairs,
      doubleZhEllipsis,
      noRedundantPunctuation,
      noRedundantSpaceAroundToken,
      noSpaceAroundZhPunct,
      noSpaceBetweenZhAndUnitSymbol,
      spaceAroundInlineCode,
      spaceBetweenZhAndEnOrNum
    ]),
    terminology, // TODO: add more terminology
    noInvalidControlCharacter
  },
  rulesConfig: {
    zhRuleSeries: true,
    terminology: true,
    noInvalidControlCharacter: true
  }
};
