const Node = (data = null) =>{
    return{
        data,
        left: null,
        right: null,
    }
}


const Tree = () =>{
    let arr = getRandArr()
    let ROOT = buildTree(arr)

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
    }

    const inOrder = (callback, node, values = [],) =>{
        if(!node) return node
        else{
            inOrder(null, node.left, values)
            values.push(node.data)
            if(callback) callback(node)
            inOrder(null, node.right, values)
    }
    if(!callback) return values
}

const preOrder = (callback, node, values = []) =>{
    if(!node) return node
    else{
            values.push(node.data)
            if(callback) callback(node)
            preOrder(null, node.left, values)
            preOrder(null, node.right, values)
        }
        if(!callback) return values
}

const postOrder = (callback, node, values = []) =>{
    if(!node) return node
    else{
        postOrder(null, node.left, values)
        postOrder(null, node.right, values)
        values.push(node.data)
        if(callback) callback(node)
    }
    if(!callback) return values
}

const height = (node) =>{
    if(!node) return 0
    else{
        let leftCount = height(node.left)
        let rightCount = height(node.right)

        if(leftCount < rightCount) return 1 + rightCount
        else return 1 + leftCount
    }
}

const depth = (node, target, dist = -1) =>{
   if(!node) return -1
   else{
    if(node.data === target) return dist + 1
    else{
        dist = depth(node.left, target)
        if(dist >= 0) return dist + 1
        dist = depth(node.right, target)
        if(dist >= 0) return dist + 1
    }
    return dist
}
}

const isBallanced = (node)=>{
  
        let leftNode = height(node.left)
        let rightNode = height(node.right)

        if((leftNode - rightNode) > 1 || (rightNode - leftNode) > 1) {
            return "Not Ballanced"
        }
        else return "Ballanced"
}

const unBalanced = ()=>{
    for (let i = 0; i < 5; i++){
        let numGreateerThanHundred = (Math.floor(Math.random()*10) + 1)*100
        insert(numGreateerThanHundred,ROOT)
    }
    return ROOT
}

const reBallance = (node, arr = [])=>{
    if(!node) return
    else{
        reBallance(node.left, arr)
        reBallance(node.right, arr)
        arr.push(node.data)
    }
    return ROOT = buildTree(arr)
}



const driverScript = ()=>{
    const arr = getRandArr()
    const Tree = buildTree(arr)
    console.log(isBallanced(Tree))
    console.log(levelOrder(null,Tree),preOrder(null,Tree), postOrder(null,Tree), inOrder(null, Tree))
    const unBalancedTree = unBalanced(Tree)
    console.log(isBallanced(unBalancedTree))
    const ballancedTree = reBallance(unBalancedTree)
    console.log(isBallanced(ballancedTree))
    console.log(levelOrder(null,ballancedTree),preOrder(null,ballancedTree), postOrder(null,ballancedTree), inOrder(null, ballancedTree))
    prettyPrint(Tree)
    prettyPrint(unBalancedTree)
    prettyPrint(ballancedTree)
}
    return{
        driverScript: ()=>{
            return driverScript()
        }
    }
}

const getRandArr = ()=>{
    let arr = []
    for(let i = 0; i < 10; i++){
        const randNum = Math.floor(Math.random()*99 + 1)
        arr.push(randNum)
    }
    return arr
}

const buildTree = (Arr) =>{
    let sortedArr = MargeSort(Arr) 
    let arr = removeDuplicates(sortedArr)
    
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

const tree = Tree()
tree.driverScript()


// **************************************************\\
// Early approch:
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



        
        //***levelorder Callback. this one has no functionality.***
        
    // const levelOrderCallback = (node, Queue) =>{
    //     if(node.left){
    //         Queue.push(node.left)
    //     }
    //     if(node.right){
    //         Queue.push(node.right)
    //     }
    //     Queue.shift()
    //     return Queue
    // }
// **************************************************\\