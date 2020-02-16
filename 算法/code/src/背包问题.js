
let items = ['g', 's', 'l', 'i', 'p']
let itemsValue = [1500, 3000, 2000, 2000, 3000]
let itemsWeight = [1, 4, 3, 1, 2]
// 背包容量拆分
let backpack = [1, 2, 3, 4];
let grid = [];
// 创建表格
for(let i = 0;i <= items.length; i ++) {
  grid.push([]);
  for(let j = 0; j <= backpack.length; j++) {
    grid[i].push({
      value: 0,
      items: []
    })
  }
}
