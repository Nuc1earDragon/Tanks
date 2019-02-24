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
Game.prototype.death = function(){

    window.addEventListener('keydown', game.restart);
    clearInterval(game.mainInterval);

    game.deathFontSize = 40;
    game.increaseFontSize = true;
    playDeathMusic();
    game.restartInterval = setInterval(function(){
        map.draw();
        game.context.drawImage(game.mainTank.position, game.mainTank.x, game.mainTank.y,30,30);
        for (var i=0; i<game.bots.length;i++){
            game.context.drawImage(game.bots[i].position, game.bots[i].x, game.bots[i].y,32,32);
        }
        for (var i = 0; i < game.bullets.length; i++) {
            game.context.drawImage(game.bullets[i].image, game.bullets[i].x, game.bullets[i].y);
        }
        showLolText();
        return;
    },20)
    
}
Game.prototype.restart = function(e){
        if(e.keyCode=="82"){
            window.removeEventListener('keydown', game.restart);
            clearInterval(game.restartInterval);
            game.deathAudio.pause();
            window.onload();
            
        }
        return;
}
function showLolText(){
    if (game.increaseFontSize){
        game.deathFontSize+=1;
        if (game.deathFontSize>60){
            game.increaseFontSize=false;
        }
    }
    else {
        game.deathFontSize-=1;
        if (game.deathFontSize<30){
            game.increaseFontSize=true;
        }

    }
    game.context.font = game.deathFontSize+'px arial';
    game.context.textAlign = "center";
    game.context.fillText('LoL you died', game.canvas.width/2,game.canvas.height/2);
    game.context.fillText('press \"R\" to restart', game.canvas.width/2,game.canvas.height/2+game.deathFontSize);

}
function playDeathMusic(){
  game.deathAudio = new Audio(); 
  game.deathAudio.src = 'death.mp3';
  game.deathAudio.loop = true;
  game.deathAudio.play();
}
/*Game.prototype.gameCreate = function(){
    game = new Game();
    map = new Map(game);
    map.draw(game);
    game.context.drawImage(game.mainTank.up.main, game.mainTank.x, game.mainTank.y,30,30);
}*/