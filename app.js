const Node = (data = null) =>{
    return{
        data,
        left: null,
        right: null,
    }
}


const Tree = (arr) =>{
    let newArr = removeDuplicates(MargeSort(arr))
    let ROOT = buildTree(newArr)

    const insert = (value, node) =>{
        if(!node){
            return node = Node(value)
        }else{
            if(value < node.data){
                node.left = insert(value, node.left)
            }else{
                node.right = insert(value, node.right)
            }
        }
        return node
    }

    const find = (value, node) =>{
        if(!node) return null
        else if(value === node.data) return node
        else{
            if(value < node.data){
                return find(value, node.left)
            }
            else if(value > node.data){
                return find(value, node.right)
            }
            else return
        }
    }

    const Delete = (value, node) =>{
        if(!node) return node;
        if(value < node.data){
            node.left = Delete(value, node.left)
        }
        else if(value > node.data){
            node.right = Delete(value, node.right)
        }
        else{
            if(!node.left) return node.right
            else if(!node.right) return node.left

            else{
                let newNode = node

                const nearestNumber = (nod) =>{
                    while(nod.left){
                        nod = nod.left
                    }
                    return nod
                }
                let newRoot = nearestNumber(newNode.right)
                node.data = newRoot.data
                Delete(newRoot.data, newNode.right)
            }
            
        }
        return node
    }

    const levelOrder = (callback, node, Queue = [], values = []) =>{

        if(!node) return node
        else{
         if(!Queue[0]) Queue.push(node)

        //  recursive ....
         let currentNode = Queue[0]
         if(!currentNode) return
         else{

             if(currentNode.right) Queue.push(currentNode.right)
             if(currentNode.left) Queue.push(currentNode.left)
             values.push(currentNode.data)
             Queue.shift()
             currentNode = Queue[0]
             levelOrder(null, currentNode, Queue, values)

            }
        }
        return values

        // iterative....
        // let currentNode = Queue[0]

        // while(currentNode){
        //     callback(currentNode, Queue)
        //     // if(!callback) 
        //     values.push(currentNode.data)
        //     currentNode = Queue[0]
        // }
        // recursion
        
        // if(!currentNode) return currentNode
        // else{
        //     currentNode = callback(Queue[0], Queue)
        //     values.push(currentNode.data)
        // }

        // return values
    }

    const levelOrderCallback = (node, Queue) =>{
        if(node.left){
            Queue.push(node.left)
        }
        if(node.right){
            Queue.push(node.right)
        }
        Queue.shift()
        return Queue
    }

    const inOrder = (callback, node, values = [],) =>{
        if(!node) return node
        else{
            inOrder(null, node.left, values)
            values.push(node.data)
            inOrder(null, node.right, values)
        }
        if(!callback) return values
        else callback(node)
    }

    return{
        insert: (value) => {
            ROOT = insert(value, ROOT)
        },
        find: (value) =>{
            return find(value, ROOT)
        },
        Delete: (value) =>{
            ROOT = Delete(value, ROOT)
        },
        levelOrder: () => {
            return levelOrder(levelOrderCallback, ROOT)
        },
        inOrder : () =>{
            return inOrder(null, ROOT,)
        },

        ROOT,
    }
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
console.log(tree)
tree.insert(88)
tree.insert(89)
tree.insert(2)
let fi = tree.find(8)
console.log(fi)
tree.Delete(67)
tree.Delete(4)
let levelOrder = tree.levelOrder()
let inOrder = tree.inOrder()
console.log(inOrder)
prettyPrint(tree.ROOT)