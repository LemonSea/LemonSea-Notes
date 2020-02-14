function selectSort(arr) {
  var len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = i; j < len; j++) {
      if(arr[j] < arr[i]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }
  return arr
}


let array = [3, 4, 0, 1, 8, 5]
let newArray = selectSort(array);
console.time()
console.log(newArray)
console.timeEnd()