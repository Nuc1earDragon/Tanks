function TankInterceptor(){};
TankInterceptor.prototype = Object.create(Interceptor.prototype);
TankInterceptor.prototype.constructor = TankInterceptor;
TankInterceptor.prototype.publicIntercept = function() {
    for (var i = 0; i < game.bots.length; i++) {
        if((game.bots[i].x == this.x) && (game.bots[i].y == this.y)) {
            continue;
        }
        if (TankInterceptor.prototype.intercept(this, game.bots[i])) {
            return true;
        }
    }
    if ( this != game.mainTank) {
        if (TankInterceptor.prototype.intercept(this, game.mainTank)) {
            return true;
        }
        else return false;
    }
    else return false;    
}