Array.prototype.shirajFlatten = function(){
    return this.reduce(function(prev,curr){
        return prev.concat(curr);
    })
}
String.prototype.shirajReplace = function (index, newValue) {

    while(this[index] === newValue){
        index = Math.floor(Math.random() * this.length)
    }
    return this.slice(0,index) + newValue + this.slice(index + 1)
}
String.prototype.shirajPad = function(minLength) {
    that = this;
    while(that.length < minLength){
        that = " " + that
    }
    return that;
};
function Game (width){
    this.width = width;
    this.height = width;
    this.area = width * width;
    this.board = this.newBoard();
    this.finished = false
}
Game.prototype = {
    newBoard: function(){
        str = "";
        while(str.length < this.area){
            str += "0";
        }

        var times = 0
        while(times < 2){
            str = str.shirajReplace(Math.floor(Math.random() * str.length) ,"2");
            times++;
        }

        return str.split("").map(function(el){
            return parseInt(el);
        });
    },
    getRows: function(){
        rows = [];
        for(var i = 0; i< this.board.length;){
            var row = [];
            while(row.length < this.width ){
                row.push(this.board[i]);
                i++;
            }
            rows.push(row);
        }
        return rows;       
    },
    setRows: function(rows){
        ret = [];
        for(var i = 0; i<rows.length; i++){
            ret = ret.concat(rows[i]);
        }
        this.board = ret;
    },
    getCols: function(){
        var cols = [];
        for(var i = 0; i < this.height;i++){
            var col = [];
            var j = i;

            while(col.length < this.height ){
                col.push(this.board[j]);
                j += this.height;
            }
            cols.push(col);
        }
        return cols;
    },
    setCols: function(cols){
        var ret = []
        for(var i = 0; i<cols.length;i++){
            for(var j = 0; j<cols[i].length;j++){
                ret.push(cols[j][i]);
            }
        }
        this.board = ret;
    },
    slide: function(direction){
        var oldBoard = this.board;
        switch(direction) {
            case 'down':
                this.moveCols(-1);
                break;
            case 'up':
                this.moveCols(1);
                break;
            case 'left':
                this.moveRows(-1);
                break;
            case 'right':
                this.moveRows(1);
                break; 
        }
        if ((this.board.indexOf(0) > -1) && (oldBoard.toString() != this.board.toString() )) {
            this.addTile();
        }
    },
    moveCols: function(offset){
        var cols = this.getCols();
        
        for(var i = 0; i<cols.length; i++){
            cols[i] = this.removeZeroes(cols[i]);
        }

        cols = this.mergeDoubles(cols);

        if (offset < 1){
            for (var i = 0; i < cols.length; i++) {
                while(cols[i].length < this.height){
                    cols[i].unshift(0);
                }
            };
        }
        else{
            for (var i = 0; i < cols.length; i++) {
                while(cols[i].length < this.height){
                    cols[i].push(0);
                }
            };   
        }
        this.setCols(cols);
    },
    moveRows: function(offset){
        var rows = this.getRows();
        
        for(var i = 0; i<rows.length; i++){
            rows[i] = this.removeZeroes(rows[i]);
        }
        rows = this.mergeDoubles(rows);

        if (offset >= 1){
            for (var i = 0; i < rows.length; i++) {
                while(rows[i].length < this.width){
                    rows[i].unshift(0);
                }
            };
        }
        else{
            for (var i = 0; i < rows.length; i++) {
                while(rows[i].length < this.width){
                    rows[i].push(0);
                }
            };   
        }

        this.setRows(rows);
    },
    mergeDoubles: function(nestedArr){

        for (var i = 0; i < nestedArr.length; i++) {
            if (nestedArr[i].length <= 1){
                continue;
            }
            for (var j = 0; j < nestedArr[i].length - 1; j++) {
                if (nestedArr[i][j] === nestedArr[i][j+1]){
                    nestedArr[i][j] *= 2;
                    nestedArr[i].splice(j+1,1);
                }
            };
        };
        return nestedArr;        
    },
    getRand: function(range){
        return Math.floor(Math.random() * range)
    },
    addTile: function(){
        possibleNewTiles = [2,4];
        rand = this.getRand(this.board.length);
        while(this.board[rand] !== 0){
            rand = this.getRand(this.board.length);
        }
        this.board[rand] = possibleNewTiles[this.getRand(possibleNewTiles.length)];
    },
    checkWon: function(){
        for(var i = 0; i < this.board.length; i++){
            if(this.board[i] === 256){
                this.finished = true;
                return true;
            }
        }
        return false;
    },
    checkLocked: function(){
        if(this.board.indexOf(0) > -1){
            return false;
        }

        var cols = this.getCols();
        var rows = this.getRows();

        for (var i = 0; i < cols.length; i++) {
            var j = 0;
            while (j<rows[i].length - 1){
                if((cols[i][j] === cols[i][j+1]) || (rows[i][j] === rows[i][j+1])){
                    return false
                }
                j++;
            }
        };

        this.finished = true;
        return true;
    },
    removeZeroes: function(arr){
        return arr.filter(function(el){ return el !== 0})
    },
    start: function(){
        while(!this.finished){
            var choice = prompt("choose: up down left right")
            this.slide(choice);
        }
    }
}