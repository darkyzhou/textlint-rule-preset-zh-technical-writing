import {
  getLeftAdjacentNode,
  getRightAdjacentNode,
  getTextContent,
  REGEX_CHINESE_PUNCTUATION,
  REGEX_SPACE
} from 'textlint-util-zh';

export default {
  type: 'node',
  Code: (context, node, helper) => {
    const { RuleError, fixer } = context;
    const errors = [];

    const leftAdjacentNode = getLeftAdjacentNode(helper, node);
    const rightAdjacentNode = getRightAdjacentNode(helper, node);

    if (shouldCheckNode(leftAdjacentNode)) {
      const endChar = getTextContent(leftAdjacentNode).slice(-1);
      if (checkCharacter(endChar)) {
        const target = isPeerNode(node, leftAdjacentNode, helper) ? node : findNodeToAddSpaceAt(node, helper);
        errors.push(
          new RuleError('行内代码块周围需要添加空格', {
            index: 0, // mark index at the beginning of the node
            fix: fixer.insertTextBefore(target, ' ')
          })
        );
      }
    }

    if (shouldCheckNode(rightAdjacentNode)) {
      const beginChar = getTextContent(rightAdjacentNode)[0];
      if (checkCharacter(beginChar)) {
        const target = isPeerNode(node, rightAdjacentNode, helper) ? node : findNodeToAddSpaceAt(node, helper);
        errors.push(
          new RuleError('行内代码块周围需要添加空格', {
            index: node.range[1] - node.range[0] - 1, // mark index at the end of the node
            fix: fixer.insertTextAfter(target, ' ')
          })
        );
      }
    }

    return errors;
  }
};

function shouldCheckNode(node) {
  return node && ['Str', 'Delete', 'Emphasis', 'Strong', 'Link'].includes(node.type);
}

function checkCharacter(char) {
  return char !== '\n' && !REGEX_SPACE.test(char) && !REGEX_CHINESE_PUNCTUATION.test(char);
}

function isPeerNode(nodeA, nodeB, helper) {
  const parent = helper.getParents(nodeA)?.[0];
  if (!parent) {
    return false;
  }
  return parent.children.includes(nodeB);
}

function findNodeToAddSpaceAt(node, helper) {
  const ancestors = helper.getParents(node);
  if (ancestors[0]?.type === 'Link') {
    return ancestors[0];
  }
  return node;
}
