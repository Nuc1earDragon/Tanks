function Interceptor(){};
  Interceptor.prototype.intercept = function(obj1, obj2) {
        var size1 = elSize(obj1);
        var size2 = elSize(obj2);
        var dSizeX = (size1.h - size2.h) / 2;
        var dSizeY = (size1.w - size2.w) / 2;
        var dx = Math.abs(obj1.x - obj2.x - dSizeX);
        var dy = Math.abs(obj1.y - obj2.y - dSizeY);
        var dh = (size1.h + size2.h) / 2;
        var dw = (size1.w + size2.w) / 2;
        if (dx <= dw) {
            if (dy <= dh) {
                return true;
            }
            else
                return false;
        }
        else
            return false;
    }


