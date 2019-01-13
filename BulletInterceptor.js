function BulletInterceptor(){};
BulletInterceptor.prototype = Object.create(Interceptor.prototype);
BulletInterceptor.prototype.constructor = BulletInterceptor;
BulletInterceptor.prototype.explitIntercept = function() {
    for (var i=0 ; i<bullets.length; i++){
        if (this.enemy != bullets[i].enemy){
            if (this.intercept(this, bullets[i])){
            bullets[i].crashed = true;
            return true;
            }
        }
        else continue;
    }
    if (this.enemy == mainTank.enemy){
        for (var i = 0; i<bots.length ; i++){
                if (this.intercept(this, bots[i])){
                bots[i].getHit();
                return true;
                }
                else continue;
            }
        return false;
        }
    else {
        if(this.intercept(this, mainTank)){
        mainTank.getHit();
        return true;
        } 
        else return false;
        }
}