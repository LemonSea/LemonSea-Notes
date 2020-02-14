// 创建图
let graph = {
  'a': {
    'b': 1,
    'c': 3
  },
  'b': {
    'd': 2,
    'e': 8
  },
  'c': {
    'd': 2,
    'f': 4
  },
  'd': {
    'e': 2
  },
  'e': {
    'g': 3
  },
  'f': {
    'e': 1,
    'g': 1
  },
  'g': {

  }
}
// graph["start"] = {}
// graph["start"]["a"] = 6
// graph["start"]["b"] = 2 -
//   graph["a"] = { }
// graph["a"]["fin"] = 1
// graph["b"] = {}
// graph["b"]["a"] = 3
// graph["b"]["fin"] = 7
// graph["fin"] = {}
// 创建开销表（保存了所有节点对应的花销）
// 开销指 start 到对应节点的开销
// 还无法计算的保存为 Infinity
let costs = {
  'b': 1,
  'c': 3,
  'd': Infinity,
  'e': Infinity,
  'f': Infinity,
  'g': Infinity
}
// costs["a"] = 6
// costs["b"] = 2
// costs["fin"] = Infinity
// 创建父节点（保存了所有节点对应的父节点
// 还无法计算的保存为 null
let parents = {
  'b': 'a',
  'c': 'a',
  'd': null,
  'e': null,
  'f': null,
  'g': null
}
// parents["a"] = "start"
// parents["b"] = "start"
// parents["fin"] = null
// 已经确定的节点，防止无限循环
let processed = [];

// 寻找权重最小的点
function findLowestCost(costs, processed) {
  // 最小开销，默认无限大
  let lowestCost = Infinity;
  let lowestCostNode = null;
  let cost;
  for (let node in costs) {
    // 获得边的花费
    cost = costs[node];
    if (cost < lowestCost && !processed.includes(node)) {
      lowestCost = cost;
      lowestCostNode = node;
    }
  }
  return lowestCostNode;
}


// dijkstra 算法
function dijkstra(graph, costs, processed) {
  // 从 costs 中找到花费最小的点
  let node = findLowestCost(costs, processed);
  let neighbors, newCost;
  while (node) {
    // 从开始到当前节点的花费
    cost = costs[node];
    // 当前节点的所有邻节点及其花费
    neighbors = graph[node];
    // 对相邻节点进行操作
    for (let n of Object.keys(neighbors)) {
      // 新花费是开始到当前节点邻节点的花费
      newCost = cost + neighbors[n];
      // 比较记录在 costs 中的花费与现在计算的花费
      if (costs[n] > newCost) {
        // 如果现在的花费比较小，就更新 costs 表
        costs[n] = newCost;
        // 同时更新 parents 表
        parents[n] = node
      }
    }
    // 该节点已处理，记录到 processed 表中
    processed.push(node);
    // 上面更新了 costs 表，所有继续寻找最小开销的节点
    node = findLowestCost(costs, processed);
  }

  return {
    costs,
    parents
  }
}

let { costs: newCost, parents: graphParents } = dijkstra(graph, costs, processed);
console.log(newCost)
console.log(graphParents)
