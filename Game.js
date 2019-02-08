function Game(){
this.mainTank = new Tank(192,208,"main");
this.mainTank.caseOn = 38;
this.mainTank.position=this.mainTank.up.main;
this.bullets = [];
this.bots=[];
this.startBotX=0;
this.time = 0;
this.canvas = document.getElementById("canvas");
this.context = this.canvas.getContext("2d");

this.cellSize = 16;
this.canvas.width = 26*this.cellSize;
this.canvas.height = 26*this.cellSize;
}