import { getTextContent, REGEX_CHINESE_PUNCTUATION, REGEX_SPACE } from 'textlint-util-zh';
import { getLeftAdjacentNode, getRightAdjacentNode } from 'textlint-util-zh';

export default {
  type: 'node',
  code: (context, node, helper) => {
    const { RuleError, fixer } = context;
    const errors = [];

    const leftAdjacentNode = getLeftAdjacentNode(helper, node);
    if (leftAdjacentNode) {
      const nodeTextEnd = getTextContent(leftAdjacentNode).slice(-1);
      if (nodeTextEnd !== '\n' && !REGEX_SPACE.test(nodeTextEnd) && !REGEX_CHINESE_PUNCTUATION.test(nodeTextEnd)) {
        errors.push(
          new RuleError('行内代码块周围需要添加空格', {
            // mark index at the beginning of the node
            index: 0,
            fix: fixer.insertTextBefore(node, ' ')
          })
        );
      }
    }

    const rightAdjacentNode = getRightAdjacentNode(helper, node);
    if (rightAdjacentNode) {
      const nodeTextBegin = getTextContent(rightAdjacentNode)[0];
      if (
        nodeTextBegin !== '\n' &&
        !REGEX_SPACE.test(nodeTextBegin) &&
        !REGEX_CHINESE_PUNCTUATION.test(nodeTextBegin)
      ) {
        // mark index at the end of the node
        const index = node.range[1] - node.range[0] - 1;
        errors.push(
          new RuleError('行内代码块周围需要添加空格', {
            index,
            fix: fixer.insertTextAfter(node, ' ')
          })
        );
      }
    }

    return errors;
  }
};
