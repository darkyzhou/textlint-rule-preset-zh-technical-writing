import { getTextContent, REGEX_CHINESE_PUNCTUATION, REGEX_SPACE } from 'textlint-util-zh';

export default {
  type: 'node',
  code: (context, node, helper) => {
    const { Syntax, RuleError, fixer } = context;
    const ancestors = helper.getParents(node);
    const errors = [];

    let containingNode = node;
    let checkForBegin = true;
    let checkForEnd = true;

    for (const ancestorNode of ancestors) {
      if (!checkForBegin && !checkForEnd) {
        break;
      }

      const ancestorChildren = ancestorNode.children;
      const containingNodeIndex = ancestorChildren.indexOf(containingNode);

      if (ancestorChildren.length <= 1) {
        containingNode = ancestorNode;
        continue;
      }

      if (checkForBegin) {
        if (containingNodeIndex > 0) {
          checkForBegin = false;

          const nodeToFindForSpace = ancestorChildren[containingNodeIndex - 1];
          if (nodeToFindForSpace.type !== Syntax.Break) {
            const nodeTextEnd = getTextContent(nodeToFindForSpace).slice(-1);
            if (!REGEX_SPACE.test(nodeTextEnd) && !REGEX_CHINESE_PUNCTUATION.test(nodeTextEnd)) {
              errors.push(
                new RuleError('行内代码块周围需要添加空格', {
                  // mark index at the beginning of the node
                  index: 0,
                  fix: fixer.insertTextBefore(node, ' ')
                })
              );
            }
          }
        }
      }

      if (checkForEnd) {
        if (containingNodeIndex < ancestorChildren.length - 1) {
          checkForEnd = false;

          const nodeToFindForSpace = ancestorChildren[containingNodeIndex + 1];
          if (nodeToFindForSpace.type !== Syntax.Break) {
            const nodeTextBegin = getTextContent(nodeToFindForSpace)[0];
            if (!REGEX_SPACE.test(nodeTextBegin) && !REGEX_CHINESE_PUNCTUATION.test(nodeTextBegin)) {
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
        }
      }
    }

    return errors;
  }
};
