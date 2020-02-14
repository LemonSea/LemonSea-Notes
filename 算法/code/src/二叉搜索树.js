// 定义节点
class Node {
  constructor(data, left, right) {
    this.left = left;
    this.right = right;
    this.data = data;
  }
  show = function () {
    return this.data
  }
}

// 创建二叉树
class BST {
  root = null;
  insert = insert;
}

// 插入
function insert(data) {
  let node = new Node(data, null, null);
  if (this.root === null) {
    this.root = node
  } else {
    let current = this.root;
    let parent;
    while (true) {
      parent = current;
      if (data < current.data) {
        current = current.left; //到左子树
        if (current === null) {  //如果左子树为空，说明可以将node插入在这里
          parent.left = node;
          break;  //跳出while循环
        }
      } else {
        current = current.right;
        if (current === null) {
          parent.right = node;
          break;
        }
      }
    }
  }
}


// 前序遍历
function preOrder(node) {
  if (node !== null) {
    // 根左右
    console.log(node.data);
    inOrder(node.left);
    inOrder(node.right);
  }
}

// 中序遍历
function inOrder(node) {
  if (node !== null) {
    //如果不是null，就一直查找左变，因此递归
    inOrder(node.left);
    //递归结束，打印当前值
    console.log(node.show());
    //上一次递归已经把左边搞完了，右边
    inOrder(node.right);
  }
}

// 后序遍历
function postOrder(node) {
  if (node !== null) {
    // 左右根
    preOrder(node.left);
    preOrder(node.right);
    console.log(node.show());
  }
}

//最小值
function getMin(bst) {
  let current = bst.root;
  while (current.left !== null) {
    current = current.left;
  }
  return current.data;
}

//最大值
function getMax(bst) {
  let current = bst.root;
  while (current.right !== null) {
    current = current.right;
  }
  return current.data;
}

function find(target, bst) {
  let current = bst.root;
  while (current !== null) {
    if (target === current.data) {
      return true;
    }
    else if (target > current.data) {
      current = current.right;
    } else if (target < current.data) {
      current = current.left;
    }
  }
  return -1;
}

let bst = new BST();
bst.insert(10);
bst.insert(8);
bst.insert(2);
bst.insert(7);
bst.insert(5);
inOrder(bst.root);
console.log(getMax(bst))
console.log(getMin(bst))
console.log(find(6, bst))