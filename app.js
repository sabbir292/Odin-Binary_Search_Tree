const Node = (data = null) =>{
    return{
        data,
        left: null,
        right: null,
    }
}


const Tree = (arr) =>{
    let newArr = removeDuplicates(MargeSort(arr))
    return ROOT = buildTree(newArr)
}

const buildTree = (arr) =>{
    
    if(arr.length < 1) return null
    const mid = Math.floor(arr.length / 2)
    const node = Node(arr[mid])

    const leftArr = arr.slice(0, mid)
    const rightArr = arr.slice(mid + 1)

    node.left = buildTree(leftArr)
    node.right = buildTree(rightArr)
    return node
}



// sort and removeDuplicates from the array.
const MargeSort = (arr) =>{
    if(arr.length < 2) return arr
    
    const mid = Math.floor(arr.length / 2)
    const leftArr = arr.slice(0, mid)
    const rightArr = arr.slice(mid)
    
    const sortedLeft = MargeSort(leftArr)
    const sortedRight = MargeSort(rightArr)
    
    return Marge(sortedLeft, sortedRight) 
}

const Marge = (leftArr, rightArr) =>{
    const result = []
    let leftIdx = 0;
    let rightIdx = 0;
    
    while(leftIdx < leftArr.length && rightIdx < rightArr.length){
        if(leftArr[leftIdx] < rightArr[rightIdx]){
            result.push(leftArr[leftIdx])
            leftIdx ++
        }else{
            result.push(rightArr[rightIdx])
            rightIdx ++
        }
    }
    return result.concat(leftArr.slice(leftIdx), rightArr.slice(rightIdx))
}

const removeDuplicates = (arr) =>{
    const uniqueArr = []
    for(let i = 0; i < arr.length; i++){
        if(arr[i] !== arr[i+1]){
            uniqueArr.push(arr[i])
        }
    }
    return uniqueArr;
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

const tree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
prettyPrint(tree)