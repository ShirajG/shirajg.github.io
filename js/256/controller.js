function Controller(model,view){
    this.model = model;
    this.view = view;
    this.forms = document.querySelectorAll('form');

    window.addEventListener("keydown",function(keypress){
        switch(keypress.keyCode) {
            case 37:
                // left key pressed
                this.model.slide('left');
                break;
            case 38:
                // up key pressed
                this.model.slide('up');
                break;
            case 39:
                // right key pressed
                this.model.slide('right');
                break;
            case 40:
                // down key pressed
                this.model.slide('down');
                break;  
        }
    }.bind(this));

    for (var i = 0; i < this.forms.length; i++){
        this.forms[i].addEventListener('submit',function(event){
            event.preventDefault();
            this.view.reset();
            this.model.board = this.model.newBoard();
            this.model.finished = false;
        }.bind(this))   
    }

    Object.observe(this.model, this.updateView.bind(this));
}
Controller.prototype = {
    updateView: function(){
        document.querySelector("#board").innerHTML = "";
        for(var i = 0; i < this.model.board.length; i++){
            var currentCell = this.model.board[i];
            cell = document.createElement('DIV');
            cell.classList.add('cell');

            if(currentCell !== 0){
                cell.innerHTML = "<span class='_"+currentCell+"'>"+currentCell+"</span>";
            }
            else{
                cell.innerHTML = " "
            }
            document.querySelector("#board").appendChild(cell);
        }
        if(this.checkWin()){
            this.view.showWin();
        }
        else if(this.checkLocked()){
            this.view.showLoss();
        }
    },
    checkWin: function(){
        return this.model.checkWon()
    },
    checkLocked: function(){
        return this.model.checkLocked()
    }
}