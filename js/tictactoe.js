/**
* @jsx React.DOM
*/
(function(){
  var Tile = React.createClass({displayName: "Tile",
    render: function() {
      var mark = this.props.content === " " ? null : this.props.content
      var position = "_"+this.props.position
      var classes = "tile " + position
      if (mark){ classes += " "+mark}
      return (
        React.createElement("div", {onClick: this.props.onClick, className: classes}, React.createElement("span", null, this.props.content))
      )
    }
  });

  var TicTacToe = React.createClass({displayName: "TicTacToe",
    getInitialState: function() {
      return {
        squares:[
          [" ", " ", " "],
          [" ", " ", " "],
          [" ", " ", " "]
        ],
        status:"in-progress",
        finished: false,
        players: [
          { mark:"X"},
          { mark:"O"}
        ],
        errors: null
      }
    },
    getCells: function(){
      return this.state.squares.reduce(function(c,p){
        return c.concat(p)
      })
    },
    getRows: function(){
      return this.state.squares
    },
    getCols: function(){
      result = [[],[],[]]
      this.getCells().forEach(function(el,index){
        result[parseInt(index % 3)].push(el)
      })
      return result
    },
    getDiagonals: function(){
      diagonals = []
      var cells = this.getCells()
      diagonals.push([cells[0],cells[4],cells[8]])
      diagonals.push([cells[2],cells[4],cells[6]])
      return diagonals
    },
    restart: function(){
      this.setState(this.getInitialState())
    },
    render: function() {
      var that = this
      return (
        React.createElement("div", null, 
          this.getCells().map(function(cell,index){
            return React.createElement(Tile, {onClick: that.handleClick.bind(null,index), content: cell, position: index, key: index})
          }), 
          React.createElement("div", {className: "errors"}, this.state.errors), 
          React.createElement("div", {className: "info-area"}, 
            React.createElement("div", {className: "status"}, "Game is ", this.state.status), 
            React.createElement("div", {className: "turn"}, "" +this.state.players[0].mark+ "'s turn"), 
            React.createElement("input", {type: "submit", value: "New Game", onClick: this.restart})
          )
        )
      )
    },
    handleClick: function(square) {
      var row = parseInt(square / 3)
      var col = parseInt(square % 3)
      var newState = this.state.squares
      
      if(this.state.finished){
        this.setError("The game is over, no further moves can be made, please start a new game.")
      }
      else if ( this.tileEmpty(newState[row][col]) ){
        this.setError(null)
        this.fillTile(newState, row, col)
        this.updateGame() 
      }else{ this.setError("Invalid Move")}
    },
    updateGame: function(){
      if (this.checkWin()){
        this.setState({
          finished: true,
          status: "finished. " + this.currentPlayer().mark + " has won!"
        })
      }
      else if(this.checkFull()){
        this.setState({
          finished: true,
          status: " locked, please start over."
        })
      }
      else{
        this.updateTurn()
      }
    },
    checkFull: function () {
      return this.getCells().indexOf(" ") === -1
    },
    checkWin: function(){
      var possibleWins = this.getDiagonals().concat(this.getCols()).concat(this.getRows())
      var player = this.currentPlayer()
      for(var i = 0; i < possibleWins.length; i++){
        if (possibleWins[i].join("") === ""+player.mark +player.mark +player.mark ){
          return true
        }
      }
      return false
    },
    tileEmpty: function(tile){
      return tile === " " ? true : false
    },
    fillTile: function(board, row, col){
      board[row][col] = this.currentPlayer().mark
      this.updateBoard(board)
    },
    updateBoard: function(newBoard){
      this.setState({
        squares: newBoard,
      })
    },
    updateTurn: function(){
      this.setState({
        players: [this.state.players[1],this.state.players[0]]
      })
    },
    currentPlayer: function(){
      return this.state.players[0]
    },
    setError: function (message) {
      this.setState({
        errors: message
      })
    }    
  });

  React.render(
    React.createElement(TicTacToe, null),
    document.getElementById('app')
  );
})();
