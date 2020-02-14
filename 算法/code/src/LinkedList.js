// 单链表节点
class Node {
  constructor(data) {
    this.next = null;
    this.data = data;
  }
}

class LinkedList {
  constructor() {
    // 两个指针，指向头和尾
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  isEmpty = isEmpty;
  unshift = unshift;
  push = push;
  shift = shift;
  pop = pop;
  get = get;
  insert = insert;
  remove = remove;
  show = show;
}

// 判断是否为空
function isEmpty() {
  return this.head === null ? true : false;
}

// 添加头节点
function unshift(data) {
  let node = new Node(data);
  if (this.head === null) {
    this.head = node;
    this.tail = node;
  } else {
    let current = node;
    node.next = this.head;
    [current, this.head] = [this.head, current];
    delete current;
  }
  this.length++;
}

// 添加尾元素
function push(data) {
  let node = new Node(data);
  if (this.head === null) {
    this.head = node;
    this.tail = node;
  } else {
    // 通过尾指针，在尾部添加一个节点
    this.tail.next = node;
    // 移动尾指针
    this.tail = node;
  }
  this.length++;
}

// 移除头元素
function shift() {
  let current = this.head;
  if (this.head === null) {
    return 'this linkedList is empty!'
  }
  if (this.head === this.tail) {
    this.head = null;
    this.tail = null;
    this.length--;
    return current.data;
  }
  this.head = current.next;
  current.next = null;
  this.length--;
  return current.data;
}

// 移除尾元素
function pop() {
  let current = this.head;
  if (this.head === null) {
    return 'this linkedList is empty!'
  }

  if (this.head === this.tail) {
    this.head = null;
    this.tail = null;
    this.length--;
    return current.data;
  }

  while (true) {
    if (current.next === this.tail) {
      break;
    }
    current = current.next;
  }
  [current, this.tail] = [this.tail, current];
  this.tail.next = null;
  this.length--;
  return current;
}

// 指定位置查找
function get(index) {
  // 临界判断
  // 处理边界条件  
  if (this.head === null) {
    return 'this linkedList is empty';
  }
  if (typeof index !== 'number' || index !== parseInt(index)) {
    return 'check you input!'
  }
  if (index >= this.length) {
    return 'you input out range!'
  }
  if (index === 0) {
    return this.head
  }
  let current = this.head;
  while (index > 0) {
    current = current.next;
    index--;
  }
  return current;
}

// 指定位置插入
function insert(index, value) {
  // 临界判断
  // 处理边界条件
  if (this.head === null) {
    return 'this linkedList is empty';
  }
  if (Boolean(value) === false || value === null || typeof index !== 'number' || index !== parseInt(index)) {
    return 'check you input!'
  }
  if (index > this.length) {
    return 'you input out range!'
  }
  if (index === 0) {
    this.unshift(value);
    return;
  }
  if (index === this.length) {
    this.push(value);
    return;
  }

  let node = new Node(value);
  let pre = this.head, post = this.head.next;
  while (index > 0) {
    if (index === 1) {
      pre.next = node;
      node.next = post;
    }
    pre = pre.next;
    post = post.next;
    index--;
  }
  delete pre, post;
  this.length++;
}

// 指定位置移除
function remove(index) {
  if (this.head === null) {
    return 'this linkedList is empty';
  }
  if (typeof index !== 'number' || index !== parseInt(index)) {
    return 'check you input!'
  }
  if (index >= this.length) {
    return 'you input out range!'
  }

  if (index === 0) {
    this.shift();
    return;
  }
  if (index === this.length - 1) {
    this.pop();
    return;
  }
  let pre = this.head, current = this.head.next;
  while (index > 0) {
    if (index === 1) {
      pre.next = current.next;
      current.next = null;
    }
    pre = pre.next;
    current = current.next;
    index--;
  }
  delete pre, current;
  this.length--;
}

// 显示链表内容
function show() {
  if (this.head === null) {
    return 'this linkedList is empty';
  }

  let list = []
  let current = this.head
  while(current){
    list.push(current.data)
    current = current.next
  }
  return list.join(' => ')
}

let linkedList = new LinkedList();