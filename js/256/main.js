document.addEventListener('DOMContentLoaded', function(){
    
    var overlay = document.querySelector("#dark-overlay")
    var win = document.querySelector("#win-modal")
    var loss = document.querySelector("#loss-modal")

    var gameView = new View(overlay,win, loss)    
    var game = new Game(4);
    var gameController = new Controller(game,gameView);
    gameController.updateView();
});
