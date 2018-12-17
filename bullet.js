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
  Bullet.prototype.getCrashed = function (bullet){
      if (bullet.crashed == true){
          return;
      };
        var i1 = 0;
        var j1 = 0;
        for (x=bullet.x+1; x<=(bullet.x+7); x+=6){
            for (y=bullet.y+1; y<=(bullet.y+7); y+=6){
                i1 = parseInt(x / 16);
                j1 = parseInt(y / 16);
                if (i1>25 || j1>25) {
                    continue;
                }
                if (isNotSteel(j1,i1)){
                    map[j1][i1] = 0;
                }      
            } 
        }
        bullet.image = bullet.crashIcon;
        bullet.x-=10;
        bullet.y-=10;
        bullet.speed = 0;
        setTimeout(function(){destroy(bullet)}, 300);
    }
function destroy (bullet) {
    bullet.crashed = true ;
}
  Bullet.prototype.getImage = function(bulletPos) {
      var src="";
      src="./img/bullet-" + bulletPos + ".png";
      var image= new Image();
      image.src=src;
      return image;
    };

function mainTankBullet(e){
        tankBullet(e.keyCode, mainTank);
      }

function passfindingBullet(bullet) {
    x1 = parseInt((bullet.x) / 16);
    y1 = parseInt((bullet.y + 1) / 16);
    x2 = parseInt((bullet.x + 7) / 16);
    y2 = parseInt((bullet.y + 7) / 16);
    if (x2 > 25) {
        x2 = 25;
    };
    if (y2 > 25) {
        y2 = 25;
    };
    var i2 = 0, j2 = 0; a = true;
    for (j2 = y1; j2 <= y2; j2++) {
        for (i2 = x1; i2 <= x2; i2++) {
            if (map[j2][i2] != '0') {
                a = false;
            }
        }

    }
    return a;
}
function isNotSteel(j1, i1) {
   if  (map[j1][i1] !== 'S'){
       return true;
   }
    else return false;    
}
function isOnMap(bullet) {
    if ((bullet.x < 0) || (bullet.x > canvas.width) || (bullet.y < 0) || (bullet.y > canvas.height)) {
        bullet.crashed = true ;
        return false;
    }
    else return true;

}
function isBulletCrashed(bullet) {
    var bulletCrash = false;
    if (isOnMap(bullet)) {
        bulletCrash = passfindingBullet(bullet);
    }
    return !bulletCrash;
}
function bulletFly() {
    for (var k = 0; k < bullets.length; k++) {
        context.drawImage(bullets[k].image, bullets[k].x, bullets[k].y);
        if (bullets[k].speed != 0){
        switch (bullets[k].bulletPos) {
            case "left":
                bullets[k].x -= bullets[k].speed;
                break;
            case "up":
                bullets[k].y -= bullets[k].speed;
                break;
            case "right":
                bullets[k].x += bullets[k].speed;
                break;
            case "down":
                bullets[k].y += bullets[k].speed;
                break;
        };

        if (isBulletCrashed(bullets[k])) {
            bullets[k].getCrashed(bullets[k]);
        }
        }
    }
bullets= bullets.filter(function(bullet){
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
        bullets.push(newBullet);
    }

}
function elSize(el, type) {
    var size = {
        x1: new Number(),
        x2: new Nubmer(),
        y1: new Number(),
        y2: new Number()
    }
    if (type == "tank") {
        size.x1 = parseInt((el.x) / 16);
        size.y1 = parseInt((el.y) / 16);
        size.x2 = parseInt((el.x + 31) / 16);
        size.y2 = parseInt((el.y + 31) / 16);
    }
    if (type == "bullet") {
        size.x1 = parseInt((el.x) / 16);
        size.y1 = parseInt((el.y + 1) / 16);
        size.x2 = parseInt((el.x + 7) / 16);
        size.y2 = parseInt((el.y + 7) / 16);
    }

    return size;
}
