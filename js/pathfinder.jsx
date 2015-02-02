/**
* @jsx React.DOM
*/
//_____________________________________________
//          GREATEST PATH REACT               \\
//==============================================
//
// Board should be composed of Tile components
// Tiles should have Row, Col, and Active properties.
// Active if the cell is in the greatest path.
//
// Board Component gets initialized with a 2D Array
// Maybe fill it with random numbers.
//
// Monkey Patch Array to support equality with another array 
Array.prototype.equals = function (array) {
    if (!array)
        return false;
    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
} 
var Utils = {
    clearChildren: function(parentNode) {
        while(app.firstChild){
            app.removeChild(app.firstChild)
        }
    },
    getRandomBoard: function(size){
        var newBoard = []
        size = parseInt(size)
        for(var i=0;i<size;i++){
            newBoard.push([])
            for (var j=0; j< size; j++) {
                newBoard[i].push(Math.floor(Math.random() * 300))
            }
        } 
        return newBoard;
    },
    getSize: function(){
      var size = parseInt(prompt("Please enter the grid size"))
      return size
    }
}
//---------------------------------
//        Components              ||
//---------------------------------
var Cell = React.createClass({
    render: function () {
        var classList = "cell"
        if( this.props.activate(this.props.row, this.props.col)){
            classList += " active"
        }
        return(
            <div onClick={this.props.update.bind(null, this.props.row, this.props.col)} className={classList}>{this.props.val}</div>
        )
    }
})
var Row = React.createClass({
    render: function(){
        var parent = this
        return(
            <div className="row">
                {this.props.data.map(function(cell, index){
                    return <Cell update={ parent.props.update} activate={parent.props.activate} val={cell} col={index} row={parent.props.row} key={[parent.props.row, index]} />
                })}
            </div>
        )
    }
});
var Game = React.createClass({
    getInitialState: function(){
        return {
            board: Utils.getRandomBoard( Utils.getSize()) 
        }
    },
    findPath: function(){
        var length = this.state.board.length - 1
        var res = new Board(this.state.board).getMax(length,length)
        this.setState({
            sum : res.val,
            path : res.path
        })
    },
    getActive: function(row,col){
        if(this.state.path === undefined){
            return false
        } else {
            for(var i=0; i< this.state.path.length; i++){
                if([row,col].equals(this.state.path[i])){
                    return true
                }
            }
            return false
        }
    },
    setCell: function(row,col){
        var newVal = parseInt(prompt("Enter a new value"))
        var newBoard = this.state.board
        newBoard[row][col] = newVal
        res = new Board(newBoard).getMax(newBoard.length - 1,newBoard.length - 1)
        this.setState({
           board : newBoard,
           val : res.val,
           path: res.path
        })
    },
    render: function(){
        var parent = this
        var sumDisplay = null
        if(this.state.sum !== undefined){
            sumDisplay = <p> The sum is: {this.state.sum} </p> 
        }
        return(
            <div className="game">
                {this.state.board.map(function(row, r_index){
                    return <Row update={parent.setCell} activate={parent.getActive} data={row} row={r_index} key={r_index}/>
                })}
                {sumDisplay}
                <button onClick={this.findPath}>Find Path</button>
            </div>
        )
    }
})
React.render(
    <Game />,
    document.getElementById('app')
)
