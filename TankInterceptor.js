function TankInterceptor(){};
TankInterceptor.prototype = Object.create(Interceptor.prototype);
TankInterceptor.prototype.constructor = TankInterceptor;
TankInterceptor.prototype.explitIntercept = function(obj) {
    for (var i = 0; i < obj.length; i++) {
        if((obj[i].x == this.x) && (obj[i].y == this.y)) {
            continue;
        }
        if (this.intercept(this, obj[i])) {
            return true;
        }
    }
    if ((this.caseOn != undefined) && (this != mainTank)) {
        if (this.intercept(this, mainTank)) {
            return true;
        }
    }
    else
        return false;
}