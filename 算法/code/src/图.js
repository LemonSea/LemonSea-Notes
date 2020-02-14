class Graph {
  constructor() {
    this.AdjList = new Map();
  }

  addVertex = addVertex;
  addEdge = addEdge;
  print = print;

  // BFS
  createVisitedObject = createVisitedObject;
  bfs = bfs;
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
function addEdge(vertex, data) {
  // 向顶点添加边之前，必须验证该顶点是否存在。
  if (this.AdjList.has(vertex)) {
    // 确保添加的边尚不存在。
    if (this.AdjList.has(data)) {
      // 获取对应顶点的数据
      let arr = this.AdjList.get(vertex);
      // 如果都通过，那么可以将边添加到顶点。
      if (!arr.includes(data)) {
        // 浅拷贝，arr 修改了，对应的 map 中的数据也修改了
        arr.push(data);
      }
    } else {
      throw `Can't add non-existing vertex ->'${data}'`;
    }
  } else {
    throw `You should add '${vertex}' first`;
  }
}

// 打印图
function print() {
  for (let [key, value] of this.AdjList) {
    console.log(key, value);
  }
}

// 将所有的顶点标为未查询
function createVisitedObject() {
  let obj = {};
  for (let key of this.AdjList.keys()) {
    obj[key] = false;
  }
  return obj;
}

function bfs(start, target) {
  // visited 保存所有 key，初始对应位 false
  let visited = this.createVisitedObject();
  let q = [];

  
  
}