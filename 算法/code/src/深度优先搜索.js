class Graph {
  constructor() {
    this.AdjList = new Map();
  }

  addVertex = addVertex;
  addEdge = addEdge;
  print = print;

  // 将所有节点标记为未处理
  createVisitedObject() {
    let arr = {};
    for (let key of this.AdjList.keys()) {
      arr[key] = false;
    }
    return arr;
  }

  dfs(startingNode) {
    console.log('\nDFS')
    // 所有节点标记未处理
    let visited = this.createVisitedObject();
    this.dfsHelper(startingNode, visited);
  }

  dfsHelper(startingNode, visited) {
    // 当前节点标记处理
    visited[startingNode] = true;
    console.log(startingNode);
    // 获取所有邻节点
    let arr = this.AdjList.get(startingNode);

    for (let elem of arr) {
      if (!visited[elem]) {
        // 递归
        this.dfsHelper(elem, visited);
      }
    }
  }
}


// 添加顶点
function addVertex(vertex) {
  if (!this.AdjList.has(vertex)) {
    this.AdjList.set(vertex, []);
  } else {
    throw 'Already Exist!!!'
  }
}

// 这里的边是一个一个添加的
function addEdge(vertex, edge) {
  // 向顶点添加边之前，必须验证该顶点是否存在。
  if (this.AdjList.has(vertex)) {
    // 获取对应顶点的数据
    let arr = this.AdjList.get(vertex);
    // 如果对应顶点数据中没有通过，那么可以将边添加到顶点。
    if (!arr.includes(edge)) {
      // 浅拷贝，arr 修改了，对应的 map 中的数据也修改了
      arr.push(edge);
    } else {
      throw `this vertex's(${vertex}) edge ${edge} existed!`
    }
  } else {
    throw `please add vertex ${vertex} first`;
  }
}

// 打印图
function print() {
  for (let [key, value] of this.AdjList) {
    console.log(key, value);
  }
}



let g = new Graph();
let arr = ['A', 'B', 'C', 'D', 'E', 'F'];
for (let i = 0; i < arr.length; i++) {
  g.addVertex(arr[i]);
}
g.addEdge('A', 'B');
g.addEdge('A', 'D');
g.addEdge('A', 'E');
g.addEdge('B', 'C');
g.addEdge('D', 'E');
g.addEdge('E', 'F');
g.addEdge('E', 'C');
g.addEdge('C', 'F');
g.print();
