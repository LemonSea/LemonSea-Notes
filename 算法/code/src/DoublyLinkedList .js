// 双链表节点
class Node {
  constructor(data) {
    this.next = null;
    this.pre = null;
    this.data = data;
  }
}

class DoublyLinkedList {
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
  reverse = reverse;
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
    this.head.pre = current;
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
    let current = node;
    node.pre = this.tail;
    this.tail.next = current;
    [current, this.tail] = [this.tail, current];
    delete current;
  }
  this.length++;
}

// 移除头元素
function shift() {
  if (this.head === null) {
    return 'this DoublyLinkedList  is empty!'
  }

  let current = this.head;
  if (this.head === this.tail) {
    this.head = null;
    this.tail = null;
    this.length--;
    return current.data;
  }
  this.head = current.next;
  current.next = null;
  this.head.pre = null;
  this.length--;
  return current.data;
}

// 移除尾元素
function pop() {
  if (this.head === null) {
    return 'this DoublyLinkedList  is empty!'
  }

  let current = this.tail;
  if (this.head === this.tail) {
    this.head = null;
    this.tail = null;
    this.length--;
    return current.data;
  }

  this.tail = current.pre;
  this.tail.next = null;
  current.pre = null;
  this.length--;
  return current.data;
}

// 指定位置查找
function get(index) {
  // 临界判断
  // 处理边界条件  
  if (this.head === null) {
    return 'this DoublyLinkedList  is empty';
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

  // 如果找的是前半部分的内容，就从头开始找
  if (index < parseInt(this.length / 2)) {
    let current = this.head;
    while (index > 0) {
      current = current.next;
      index--;
    }
    // return current;
    return current;
  }

  // 否则，从尾部开始找
  let current = this.tail;
  let num = this.length - 1 - index;
  while (num > 0) {
    current = current.pre;
    num--;
  }
  return current;
}

// 指定位置插入
function insert(index, value) {
  // 临界判断
  // 处理边界条件
  if (this.head === null) {
    return 'this DoublyLinkedList  is empty';
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
  if (index < parseInt(this.length / 2)) {
    let before = this.head, after = this.head.next;
    while (index > 0) {
      if (index === 1) {
        before.next = node;
        node.pre = before;
        node.next = after;
        after.pre = node;
      }
      before = before.next;
      after = after.next;
      index--;
    }
    delete before, after;
    this.length++;
    return;
  }

  let before = this.tail.pre, after = this.tail;
  let num = this.length - index;
  while (num > 0) {
    if (num === 1) {
      before.next = node;
      node.pre = before;
      node.next = after;
      after.pre = node;
    }
    before = before.pre;
    after = after.pre;
    num--;
  }
  delete before, after;
  this.length++;
  return;
}

// 指定位置移除
function remove(index) {
  if (this.head === null) {
    return 'this DoublyLinkedList  is empty';
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

  if (index < parseInt(this.length / 2)) {
    let before = this.head, current, after;
    while (index > 0) {
      if (index === 1) {
        current = before.next;
        after = current.next;
        before.next = after;
        after.pre = before;
        current.pre = null;
        current.next = null;
        break;
      }
      before = before.next;
      index--;
    }
    delete before, after;
    this.length--;
    return { before, current, after };
  }

  let before, current = this.tail, after;
  let num = this.length - index;
  while (num > 0) {
    if (num === 1) {
      before = current.pre;
      after = current.next;
      before.next = after;
      after.pre = before;
      current.next = null;
      current.pre = null;
      break;
    }
    current = current.pre;
    num--;
  }
  this.length--;
  return current;
}

// 显示链表内容
function show() {
  if (this.head === null) {
    return 'this DoublyLinkedList  is empty';
  }

  let list = []
  let current = this.head
  while (current) {
    list.push(current.data)
    current = current.next
  }
  return list.join(' <=> ')
}

// 翻转列表
function reverse() {
  let current = this.head;
  let prev = null;
  while (current) {
    let next = current.next
    current.next = prev
    current.pre = next
    prev = current
    current = next
  }
  this.tail = this.head
  this.head = prev
}

let doublyLinkedList = new DoublyLinkedList();
[1, 2, 3, 4, 5, 6].forEach(item => {
  doublyLinkedList.push(item);
})
