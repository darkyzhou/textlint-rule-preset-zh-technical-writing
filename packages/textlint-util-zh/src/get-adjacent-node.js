export function getLeftAdjacentNode(helper, node) {
  return getAdjacentNode(true, helper, node);
}

export function getRightAdjacentNode(helper, node) {
  return getAdjacentNode(false, helper, node);
}

function getAdjacentNode(isLeft, helper, node) {
  const ancestors = helper.getParents(node);
  let containingNode = node;

  for (const ancestorNode of ancestors) {
    const ancestorChildren = ancestorNode.children;
    const containingNodeIndex = ancestorChildren.indexOf(containingNode);

    if (ancestorChildren.length <= 1) {
      containingNode = ancestorNode;
      continue;
    }

    if (isLeft && containingNodeIndex > 0) {
      return ancestorChildren[containingNodeIndex - 1];
    }

    if (!isLeft && containingNodeIndex < ancestorChildren.length - 1) {
      return ancestorChildren[containingNodeIndex + 1];
    }

    containingNode = ancestorNode;
  }

  return null;
}
