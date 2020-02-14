class Graph {
  constructor() {
    this.objMap = new Map();
  }
  addVertices = addVertices;
  addEdge = addEdge;
  print = print;
}

function addVertices(vertex) {
  if(!this.objMap.has(vertex)) {
    this.objMap.set(vertex, [])
  } else {
    throw `this vertex ${vertex} existed!`
  }
}

function addEdge(vertex, edge) {
  if(this.objMap.has(vertex)) {
    let arr = this.objMap.get(vertex);
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
  for (let [key, value] of this.objMap) {
    console.log(key, value);
  }
}



let graph = new Graph();
graph.addVertices('A')
graph.addVertices('B')
graph.addVertices('C')
graph.addVertices('D')
graph.addVertices('E')
graph.addVertices('F')
graph.addVertices('G')
graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('B', 'E')
graph.addEdge('C', 'D')
graph.addEdge('C', 'F')
graph.addEdge('D', 'E')
graph.addEdge('F', 'E')
graph.addEdge('E', 'G')