function Bullet(X, Y, bulletPos ) {
    this.image = this.getImage(bulletPos);
    this.x= X;
    this.y= Y;
    this.bulletPos= bulletPos;
    this.enemy = false;
    this.crashed = false;
    this.crashIcon = new Image();
    this.crashIcon.src="./img/hit1.png";
    this.speed = 2;
  }
  Bullet.prototype = Object.create(BulletInterceptor.prototype) ;
  Bullet.prototype.constructor = Bullet ;  
  Bullet.prototype.getImage = function(bulletPos) {
    var src="";
    src="./img/bullet-" + bulletPos + ".png";
    var image= new Image();
    image.src=src;
    return image;
  };
  Bullet.prototype.getCrashed = function (){
      if (this.crashed == true){
          return;
      };
        var i1 = 0;
        var j1 = 0;
        for (x=this.x+1; x<=(this.x+7); x+=6){
            for (y=this.y+1; y<=(this.y+7); y+=6){
                i1 = parseInt(x / 16);
                j1 = parseInt(y / 16);
                if (i1>25 || j1>25) {
                    continue;
                }
                if (isNotSteel(j1,i1)){
                    map.map[j1][i1] = 0;
                }      
            } 
        }
        this.image = this.crashIcon;
        this.x-=10;
        this.y-=10;
        this.speed = 0;
        var a = this;
        setTimeout(function(){destroy(a)}, 300);
    }
  

function destroy (obj) {
    if (obj.crashed == true){
        return;
    }
        obj.crashed = true ;
        if (obj == game.mainTank){
            setTimeout(game.death(), 100);
        }
        }
    
function mainTankBullet(e){
        tankBullet(e.keyCode, game.mainTank);
      }

function isNotSteel(j1, i1) {
   if  (map.map[j1][i1] !== 'S'){
       return true;
   }
    else return false;    
}
function isOnMap(bullet) {
    if ((bullet.x < 0) || (bullet.x+8> canvas.width) || (bullet.y < 0) || (bullet.y+8> canvas.height)) {
        bullet.crashed = true ;
        return false;
    }
    else return true;

}
function isBulletCrashed(bullet) {
    var bulletCrash = false;
    if (isOnMap(bullet)) {
        bulletCrash = !passfinding(bullet);

    }
    return bulletCrash;
}
function bulletFly() {
    for (var k = 0; k < game.bullets.length; k++) {
        game.context.drawImage(game.bullets[k].image, game.bullets[k].x, game.bullets[k].y);
        if (game.bullets[k].speed != 0){
        switch (game.bullets[k].bulletPos) {
            case "left":
                game.bullets[k].x -= game.bullets[k].speed;
                break;
            case "up":
                game.bullets[k].y -= game.bullets[k].speed;
                break;
            case "right":
                game.bullets[k].x += game.bullets[k].speed;
                break;
            case "down":
                game.bullets[k].y += game.bullets[k].speed;
                break;
        };

        if (isBulletCrashed(game.bullets[k])) {
            game.bullets[k].getCrashed();
        }
        if (game.bullets[k].publicIntercept()) {
            game.bullets[k].crashed = true;
        } 
        }
    }
    game.bullets = game.bullets.filter(function(bullet){
    return !bullet.crashed ;
    });
}
function tankBullet(e, tank) {
    if (e == 32) {
        switch (tank.caseOn) {
            case 37:

                var newBullet = new Bullet(tank.x, tank.y, "left");
                newBullet.x = tank.x - 8;
                newBullet.y = tank.y + 10;
                break;

            case 38:

                var newBullet = new Bullet(tank.x, tank.y, "up")
                newBullet.x = tank.x + 12;
                newBullet.y = tank.y - 8;
                break;

            case 39:

                var newBullet = new Bullet(tank.x, tank.y, "right")
                newBullet.x = tank.x + 30;
                newBullet.y = tank.y + 10;
                break;

            case 40:

                var newBullet = new Bullet(tank.x, tank.y, "down")
                newBullet.x = tank.x + 12;
                newBullet.y = tank.y + 30;
                break;

        }
        newBullet.enemy = tank.enemy;
        game.bullets.push(newBullet);
    }

}

function elSize(el) {
    var size = {
        x1: new Number(),
        x2: new Number(),
        y1: new Number(),
        y2: new Number(),
        w: new Number(),
        h: new Number()
    }
    if (el.bulletPos != undefined ) {
        size.x1 = parseInt((el.x) / 16);
        size.y1 = parseInt((el.y + 1) / 16);
        size.x2 = parseInt((el.x + 7) / 16);
        size.y2 = parseInt((el.y + 7) / 16);
        size.w = 7;
        size.h=7;
    }
    else {
        size.x1 = parseInt((el.x) / 16);
        size.y1 = parseInt((el.y) / 16);
        size.x2 = parseInt((el.x + 31) / 16);
        size.y2 = parseInt((el.y + 31) / 16);
        size.w= 31;
        size.h= 31;
    }
    return size;
}
