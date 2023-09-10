function tree(arr) {
  const tree = {};

  tree.buildTree = (arr) => {
    if (!arr.length) {
      return null;
    }
    arr = mergeSort(arr);
    arr = removeDuplicates(arr);
    let mid = Math.floor(arr.length / 2);
    let root = node();
    root.data = arr[mid];
    root.left = tree.buildTree(arr.slice(0, mid));
    root.right = tree.buildTree(arr.slice(mid + 1));
    return root;
  };

  tree.root = tree.buildTree(arr);

  return tree;
}

function node() {
  const node = {};

  node.data = null;
  node.left = null;
  node.right = null;

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
prettyPrint(myTree.root);
