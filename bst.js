function tree(arr) {
  const tree = {};

  tree.buildTree = (arr) => {
    if (!arr.length) {
      return null;
    }
    arr = removeDuplicates(arr);
    arr = mergeSort(arr);
    let mid = Math.floor(arr.length / 2);
    let root = node();
    root.data = arr[mid];
    root.left = tree.buildTree(arr.slice(0, mid));
    root.right = tree.buildTree(arr.slice(mid + 1));
    return root;
  };

  tree.root = tree.buildTree(arr);

  tree.insert = (data, currentNode = tree.root) => {
    if (currentNode === null) {
      currentNode = node(data);
      return currentNode;
    }

    if (data < currentNode.data)
      currentNode.left = tree.insert(data, currentNode.left);

    if (data > currentNode.data)
      currentNode.right = tree.insert(data, currentNode.right);

    return currentNode;
  };

  tree.delete = (data, currentNode = tree.root) => {
    if (currentNode === null) {
      return null;
    }

    if (data < currentNode.data) {
      currentNode.left = tree.delete(data, currentNode.left);
      return currentNode;
    }

    if (data > currentNode.data) {
      currentNode.right = tree.delete(data, currentNode.right);
      return currentNode;
    }

    // If the data is equal to the current node's data, this is the node to delete
    if (currentNode.left === null) {
      return currentNode.right;
    }

    if (currentNode.right === null) {
      return currentNode.left;
    }

    // Node with two children, find the in-order successor (smallest in the right subtree)
    currentNode.data = findMinValue(currentNode.right);

    // Delete the in-order successor
    currentNode.right = tree.delete(currentNode.data, currentNode.right);

    return currentNode;
  };

  tree.find = (data, currentNode = tree.root) => {
    if (currentNode === null) {
      return null;
    }

    if (data < currentNode.data) {
      return tree.find(data, currentNode.left);
    }
    if (data > currentNode.data) {
      return tree.find(data, currentNode.right);
    }

    return currentNode;
  };

  tree.levelOrder = (
    func = null,
    queue = [tree.root],
    arrayOfNodeValues = [],
  ) => {
    if (queue.length === 0) return arrayOfNodeValues;

    const currentNode = queue.shift();
    arrayOfNodeValues.push(currentNode.data);

    if (currentNode.left) queue.push(currentNode.left);
    if (currentNode.right) queue.push(currentNode.right);

    if (func) func(currentNode);

    return tree.levelOrder(func, queue, arrayOfNodeValues);
  };

  tree.inorder = (
    func = null,
    currentNode = tree.root,
    arrayOfNodeValues = [],
  ) => {
    //base case
    if (!currentNode) return;

    tree.inorder(func, currentNode.left, arrayOfNodeValues);
    arrayOfNodeValues.push(currentNode.data);
    if (func) func(currentNode);
    tree.inorder(func, currentNode.right, arrayOfNodeValues);

    return arrayOfNodeValues;
  };

  tree.preorder = (
    func = null,
    currentNode = tree.root,
    arrayOfNodeValues = [],
  ) => {
    //base case
    if (!currentNode) return;

    arrayOfNodeValues.push(currentNode.data);
    if (func) func(currentNode);
    tree.preorder(func, currentNode.left, arrayOfNodeValues);
    tree.preorder(func, currentNode.right, arrayOfNodeValues);

    return arrayOfNodeValues;
  };

  return tree;
}

function node(data = null, left = null, right = null) {
  const node = {};

  node.data = data;
  node.left = left;
  node.right = right;

  return node;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const middle = Math.floor(arr.length / 2);
  let left = arr.slice(0, middle);
  let right = arr.slice(middle);

  left = mergeSort(left);
  right = mergeSort(right);

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift());
      continue;
    }
    result.push(right.shift());
  }
  return result.concat(left, right);
}

function removeDuplicates(arr) {
  for (let i = 1; i < arr.length; i++) {
    const lastNumber = arr[i - 1];
    const currentNumber = arr[i];

    if (lastNumber === currentNumber) arr.splice(i, 1);
  }
  return arr;
}

let myTree = tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
// myTree.insert(69);
// myTree.delete(324);
// myTree.levelOrder(console.log);
// console.log(myTree.inorder());
console.log(myTree.preorder());
// console.log(myTree.levelOrder(console.log));
prettyPrint(myTree.root);
