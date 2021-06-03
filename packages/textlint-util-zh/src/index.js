export function getTextContent(node) {
  if (!node) {
    throw new Error(`invalid argument node: ${node}`);
  }

  if (!node.children) {
    return node.value;
  } else {
    return node.children.map((childNode) => getTextContent(childNode)).join('');
  }
}
