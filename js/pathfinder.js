//=================================
//   Greatest Path Algorithm      \\
//==================================
//
// Start at the final square
// Work backwards to top left.
// Recursively select the greater
// path.
//
//==================================
function pathParser (array) {
    var res = []
    for(var i=0; i < array.length-1; i++){
        if(array[i][0] < array[i+1][0]){
            res.push("D")
        }
        else{
            res.push("R")
        }
    }
    return res
}
function Board(arr){
    this.board = arr
    this.cache = this.generateEmptyBoard(arr)
}
Board.prototype = { 
    getMax: function(row, col){
        if(this.cache[row][col] !== null){
            return this.cache[row][col]
        }
        if( row === 0 && col === 0){
            return this.cache[row][col] = {
                val: this.board[row][col],
                path:[[row,col]]
            }
        }
        if (row === 0){
            var greatest = this.getMax(row, col-1)
            var newPath = greatest.path.slice(0)
            newPath.push([row,col])
            return this.cache[row][col] = {
                val:  greatest.val + this.board[row][col],
                path: newPath
            }
        }
        if (col === 0){
            var greatest = this.getMax(row -1, col)
            var newPath = greatest.path.slice(0)
            newPath.push([row,col])
            return this.cache[row][col] = {
                val:  greatest.val + this.board[row][col],
                path: newPath 
            }
        }
        var path1 = this.getMax(row - 1, col)
        var path2 = this.getMax(row, col - 1)
        if(path1.val > path2.val){
            var newPath = path1.path.slice(0)
            newPath.push([row,col])
            return this.cache[row][col] = {
                val: this.board[row][col] + path1.val,
                path: newPath 
            }
        }
        else {
            var newPath = path2.path.slice(0)
            newPath.push([row,col])
            return this.cache[row][col] = {
                val: this.board[row][col] + path2.val,
                path: newPath
            }
        }
    },
    generateEmptyBoard: function(arr) {
        var newBoard = []
        for(var i=0;i<arr.length;i++){
            newBoard.push(new Array)
            for(var j=0;j<arr[0].length;j++){
                newBoard[i][j] = null 
            }
        }
        return newBoard
    },
    // displayBoard: function  () {
    //     var height = this.board.length
    //     var length = this.board[0].length

    //     var frag = document.createDocumentFragment()
    //     this.board.forEach(function (row, row_index) {
    //         var _row = document.createElement('div')
    //         _row.setAttribute('class','row')
    //         row.forEach(function (cell, col_index) {
    //             var div = document.createElement('div')
    //             div.setAttribute('class', 'cell')
    //             div.id = '_' + row_index + col_index
    //             div.innerHTML = ""+cell
    //             _row.appendChild(div)
    //         })
    //         frag.appendChild(_row)
    //     })

    //     var targetDOMNode = document.getElementById('app') 
    //     targetDOMNode.appendChild(frag)

    // },
    clearCache: function () {
        this.cache = this.generateEmptyBoard(this.board)
    }//,
    // displayPath: function(){
    //     var answer = this.getMax(this.board.length - 1,this.board.length - 1 )
    //     answer.path.forEach(function (el) {
    //         document.getElementById('_'+el.join('')).className += " active"
    //     })
    //     var answerInfo = document.createDocumentFragment()
    //     var stats = document.createElement('p')
    //     stats.innerHTML = "The largest sum is: " + answer.val
    //     answerInfo.appendChild(stats)
    //     var targetDOMNode = document.getElementById('app') 
    //     targetDOMNode.appendChild(answerInfo)
    // }
};

