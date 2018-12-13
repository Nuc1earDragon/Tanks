var crashedBullets = [];
function CrashedBullet(X, Y) {
    this.x = X;
    this.y = Y;
    this.time;
    this.Image = {
        main: getImage('main'),
        alt: getImage('alt')
    };
    function getImage(arg) {
        var scr = "";
        if (arg = "main") {
            src = "./img/hit1.png";
        }
        if (arg = "alt") {
            src = "./img/hit2.png";
        }
        var image = new Image();
        image.src = src;
        return image;
    }
}

function drawCrash() {
    for (i = 0; i < crashedBullets.length; i++) {
        context.drawImage(crashedBullets[i].Image.main, crashedBullets[i].x - 4, crashedBullets[i].y - 4);
        crashedBullets[i].time++;
        if (crashedBullets[i].time == 30) {
            crashedBullets.splice(i, 1);
        }
    }
}
function passfindingBullet(Bullet) {
    x1 = parseInt((Bullet.x) / 16);
    y1 = parseInt((Bullet.y + 1) / 16);
    x2 = parseInt((Bullet.x + 7) / 16);
    y2 = parseInt((Bullet.y + 7) / 16);
    if (x2 > 25) {
        x2 = 25;
    };
    if (y2 > 25) {
        y2 = 25;
    };
    var i2 = 0, j2 = 0;
    for (j2 = y1; j2 <= y2; j2++) {
        for (i2 = x1; i2 <= x2; i2++) {
            if (map[j2][i2] == 'S') {
                return 'Steel'
            }
            if (map[j2][i2] == 'K') {
                return true
            }
        }

    }
    return false;
}
function battlefield(arg, k) {
    if ((arg.x < 0) || (arg.x > canvas.width) || (arg.y < 0) || (arg.y > canvas.height)) {
        bullets.splice(k, 1);
        return false;
    }
    else return true;

}
function bulletFly() {
    var bulletCrash = false;
    for (var k = 0; k < bullets.length; k++) {
        context.drawImage(bullets[k].image, bullets[k].x, bullets[k].y, 8, 8);

        switch (bullets[k].bulletPos) {
            case "left":
                bullets[k].x -= bullets[k].speed;
                pass = battlefield(bullets[k], k);
                if (pass == true) { bulletCrash = passfindingBullet(bullets[k]); }
                break;
            case "up":
                bullets[k].y -= bullets[k].speed;
                pass = battlefield(bullets[k], k);
                if (pass == true) {
                    bulletCrash = passfindingBullet(bullets[k]);
                }
                break;
            case "right":
                bullets[k].x += bullets[k].speed;
                pass = battlefield(bullets[k], k);
                if (pass == true) {
                    bulletCrash = passfindingBullet(bullets[k]);
                }
                break;
            case "down":
                bullets[k].y += bullets[k].speed;
                pass = battlefield(bullets[k], k);
                if (pass == true) {
                    bulletCrash = passfindingBullet(bullets[k]);
                }
                break;
        };



        if (bulletCrash == true) {
            var i1 = 0;
            var j1 = 0;
            newBullet = new CrashedBullet(bullets[k].x, bullets[k].y);
            newBullet.time = 0;
            crashedBullets.push(newBullet);
            i1 = parseInt((bullets[k].x + 1) / 16);
            j1 = parseInt((bullets[k].y + 1) / 16);
            map[j1][i1] = 0;
            i1 = parseInt((bullets[k].x + 7) / 16);
            map[j1][i1] = 0;
            j1 = parseInt((bullets[k].y + 7) / 16);
            map[j1][i1] = 0;
            i1 = parseInt((bullets[k].x + 1) / 16);
            map[j1][i1] = 0;
            bullets.splice(k, 1);
        }
        if (bulletCrash == 'Steel') {
            bullets.splice(k, 1);
        }
    }
}
function tankBullet(e, Tank, enemy) {
    if (e == 32) {
        switch (Tank.caseOn) {
            case 37:

                var newBullet = new Bullet(Tank.x, Tank.y, "left");
                newBullet.x = Tank.x - 8;
                newBullet.y = Tank.y + 10;
                newBullet.enemy = enemy;
                bullets.push(newBullet);
                break;

            case 38:

                var newBullet = new Bullet(Tank.x, Tank.y, "up")
                newBullet.x = Tank.x + 12;
                newBullet.y = Tank.y - 8;
                newBullet.enemy = enemy;
                bullets.push(newBullet);
                break;

            case 39:

                var newBullet = new Bullet(Tank.x, Tank.y, "right")
                newBullet.x = Tank.x + 30;
                newBullet.y = Tank.y + 10;
                newBullet.enemy = enemy;
                bullets.push(newBullet);
                break;

            case 40:

                var newBullet = new Bullet(Tank.x, Tank.y, "down")
                newBullet.x = Tank.x + 12;
                newBullet.y = Tank.y + 30;
                newBullet.enemy = enemy;
                bullets.push(newBullet);
                break;

        }
        if (Tank != mainTank) { bullets[bullets.length - 1].enemy = true };
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
