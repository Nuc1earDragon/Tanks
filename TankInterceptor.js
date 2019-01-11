function TankInterceptor(){};
TankInterceptor.prototype = Object.create(Interceptor.prototype);
TankInterceptor.prototype.constructor = TankInterceptor;
TankInterceptor.prototype.explitIntercept = function(obj){
    for (i=0;i<obj.length; i++){
        if (this.intercept(this,obj[i])){
            return true;
        }
    }
    if ((obj.caseOn != undefined) && (tank != mainTank)){
        if(this.intercept (this, mainTank)){
            return true;
        }
    }
    else return false;
}