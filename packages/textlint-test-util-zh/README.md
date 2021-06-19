# `textlint-test-util-zh`

Utility packages for testing textlint-rule-zh series packages

## Usage

```javascript
const { runRuleTest } = require('textlint-test-util-zh');

const testRule = {}; // your rule object here

runRuleTest({
  name: 'test-name',
  rules: [testRule],
  plainTextFixableCases: ['test']
});
```
