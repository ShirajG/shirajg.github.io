function View(overlay,winModal,lossModal){
    this.overlay = overlay;
    this.winModal = winModal;
    this.lossModal = lossModal;
}
View.prototype = {
    showLoss: function(domElement){
        this.overlay.style.display= 'block';
        this.lossModal.style.display= 'block';
    },
    showWin: function(domElement){
        this.overlay.style.display = 'block';
        this.winModal.style.display = 'block';
    },
    reset: function(){
        this.overlay.style.display='none';
        this.winModal.style.display='none';
        this.lossModal.style.display='none';
    }
};