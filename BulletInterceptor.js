function BulletInterceptor(){};
BulletInterceptor.prototype = Object.create(Interceptor.prototype);
BulletInterceptor.prototype.constructor = BulletInterceptor;
BulletInterceptor.prototype.publicIntercept = function() {
    for (var i=0 ; i<game.bullets.length; i++){
        if (this.enemy != game.bullets[i].enemy){
            if (this.intercept(this, game.bullets[i])){
            game.bullets[i].crashed = true;
            return true;
            }
        }
        else continue;
    }
    if (this.enemy == game.mainTank.enemy){
        for (var i = 0; i<game.bots.length ; i++){
                if (this.intercept(this, game.bots[i])){
                game.bots[i].getHit();
                return true;
                }
                else continue;
            }
        return false;
        }
    else {
        if(this.intercept(this, game.mainTank)){
        game.mainTank.getHit();
        return true;
        } 
        else return false;
        }
}