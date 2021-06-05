import assert from 'assert';
import { getTextContent } from '../src';
import { parse as parseTextAst } from '@textlint/text-to-ast';
import { parse as parseMarkdownAst } from '@textlint/markdown-to-ast';

// TODO: add more test cases

const plainTextTestData = [
  {
    ast: parseTextAst(`■ Title
This is plain texts.
这是一段纯文本。`),
    expected: `■ TitleThis is plain texts.这是一段纯文本。`
  }
];

const markdownTestData = [
  {
    ast: parseMarkdownAst(`This is a

[测试 **Link**](http://example.com)

另一段文本`),
    expected: `This is a测试 Link另一段文本`
  }
];

describe('getTextContent()', function () {
  describe('plain text', function () {
    it('should return correct results', function () {
      for (const { ast, expected } of plainTextTestData) {
        assert.deepStrictEqual(getTextContent(ast), expected);
      }
    });
  });

  describe('markdown', function () {
    it('should return correct results', function () {
      for (const { ast, expected } of markdownTestData) {
        assert.deepStrictEqual(getTextContent(ast), expected);
      }
    });
  });
});
