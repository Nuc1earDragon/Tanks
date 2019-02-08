
function createBot(){
    if (game.bots.length<3){
        var newBot= new Tank(game.startBotX,0,"bot");
        newBot.AI=40; 
        newBot.speed = 1;
        newBot.enemy = true;
        game.bots.push(newBot);
        game.startBotX+=192;
        if (game.startBotX> 400){
            game.startBotX=0;
        }
    }
}
function botMove(game){
    game.time++;
    for (var i=0; i<game.bots.length;i++){
        game.context.drawImage(game.bots[i].position, game.bots[i].x, game.bots[i].y,32,32);
        if (game.bots[i].speed == 0){
            continue;
        }
        AInt(game.bots[i]);
        tankMove(game.bots[i].AI, game.bots[i]);
        if ((game.time/20) - (parseInt(game.time/20))==0){
            var randBullet=parseInt(100*Math.random());
            if (randBullet<50){
                tankBullet(32, game.bots[i]);
            }
        }
       
    }
    game.bots = game.bots.filter(function(Tank){
        return !Tank.crashed ;
        });
}
function AInt(tank){
    var path = AItraking(tank);
    if (path && typeof path[2] !== 'undefined') {
    var dy=path[2][0];
    var dx=path [2][1];
    var cx=tank.x;
    var cy=tank.y;
    if (dx>cx) {
        tank.AI= 39;
    }
    if (dx<cx) {
        tank.AI= 37;
    }
    if (dy>cy) {
        tank.AI= 40;
    }
    if (dy<cy) {
        tank.AI= 38;
    }
    }
}
function AItraking(tank){
    var start = {x:0, y:0};
    var target={x:0, y:0};
    start.x=tank.x;
    start.y=tank.y;
    target.x = game.mainTank.x;
    target.y = game.mainTank.y;
    
        var grid = {};
        var x, y;
        var H = 25;
        var W = 25;
        for (x=0;x<26;x++) {
            grid[x]={};
          for (y=0; y<26;y++) {
            grid[x][y] = map.map[x][y];
            if ((x==25)||(y==25)) {
                continue;
            };
            if ((map.map[x+1][y]=='K')||(map.map[x][y+1]=='K')||(map.map[x+1][y+1]=='K')) {
                grid[x][y]='K';
            };
            if ((map.map[x+1][y]=='S')||(map.map[x][y+1]=='S')||(map.map[x+1][y+1]=='S')) {
                grid[x][y]='K';
            };
          }
        }
      
       
        var ay = parseInt(start.x / 16);
        var ax = parseInt(start.y / 16);
        var by = parseInt(target.x / 16);
        var bx = parseInt(target.y / 16);
      
        var dx = [1, 0, -1, 0];
        var dy = [0, 1, 0, -1];
        var d, k;
        var stop;
        var len;
      
        // 1. Initialisation
        d = 1;
        grid[ax][ay] = 1;
        var x1= Number (0);
        var y1= Number (0);
        // 2. Wave expansion
       do {
     //   stop = true;
        for ( x = 0; x < W ; x++ ) {
          for ( y = 0; y < H ; y++ ) {
          if ( grid[x][y] == d ) {
            for ( k = 0; k < 4; k++ ) {
                x1=+x + parseInt(dx[k]);
                y1=+y + parseInt(dy[k]);
                if ((0>x1)||(x1>H)||(0>y1)||(y1>W)){
                    continue;
                }
                if ( grid[x1][y1] === 0 ) {

                  grid[x1][y1] = d + 1;
                }
            }
          }
          }
        }
        d++;
    } while ( grid[bx][by] === 0 && d<100);
      
       
      
        // 3. Backtrace
        len = grid[bx][by];
        x = bx;
        y = by;
        d = len;
        var path = [];
        path[d] = [x, y];
        d-=1;
        while ( d > 0 ) {
        for (k = 0; k < 4; k++){
            x1=+x + parseInt(dx[k]);
            y1=+y + parseInt(dy[k]);
            if ((0>x1)||(x1>H)||(0>y1)||(y1>W)){
                    continue;
                }
          if (grid[x1][y1] == d)
            {
            x = x1;
            y = y1;
            path[d] = [x, y];
            break;
            }
        }
        d--;
        }
      
      
        for (var p = path.length-1 ; p>0;p--) {
        path[p] = [path[p][0] * 16, path[p][1] * 16];
        }
      
        return path;
      };
    

