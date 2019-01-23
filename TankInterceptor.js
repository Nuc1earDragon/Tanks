function TankInterceptor(){};
TankInterceptor.prototype = Object.create(Interceptor.prototype);
TankInterceptor.prototype.constructor = TankInterceptor;
TankInterceptor.prototype.publicIntercept = function() {
    for (var i = 0; i < bots.length; i++) {
        if((bots[i].x == this.x) && (bots[i].y == this.y)) {
            continue;
        }
        if (TankInterceptor.prototype.intercept(this, bots[i])) {
            return true;
        }
    }
    if ( this != mainTank) {
        if (TankInterceptor.prototype.intercept(this, mainTank)) {
            return true;
        }
        else return false;
    }
    else return false;    
}