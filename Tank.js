function Tank(X,Y,type) {
  this.up =  {
    main : this.getImage(type, "up","s1"),
    alt : this.getImage(type, "up","s2") ,
  };
  this.left= {
  main : this.getImage(type, "left", "s1"),
  alt : this.getImage(type, "left", "s2"),
//  hit: this.getImage(type, "left", "blink"),
  };
  this.right= {
    main : this.getImage(type, "right", "s1"),
    alt : this.getImage(type, "right", "s2"),
 //   hit: this.getImage(type, "right", "blink"),
    };
  this.down= {
    main : this.getImage(type, "down", "s1"),
    alt:  this.getImage(type, "down", "s2"),
 //   hit: this.getImage(type, "down", "blink"),
    };
  this.x= X;
  this.y= Y;
  this.position=new Image();
  this.caseOn = 40;
  this.enemy = false;
  this.speed = 2;
  }
  Tank.prototype = Object.create(TankInterceptor.prototype) ;
  Tank.prototype.constructor = Tank ;  
  Tank.prototype.getImage=function(tankType, direction,alternative) {
       var src="";
      switch (tankType){
        case "main": 
        src="./img/tank1-" + direction + "-" + alternative + "_1.png";
        break;
        case "bot":
        src="./img/normal-bot-"+direction+"-"+alternative+"_1.png";
        break;
      }
      var image= new Image();
      image.src=src;
      return image;
    }
  

//**************************************************************************************************************************************************
//**************************************************************************************************************************************************

    

var mainTank = new Tank(192,208,"main");
mainTank.caseOn = 38;
var move_count= 1;
mainTank.position=mainTank.up.main;
var fps = 1000/60;
var bullets = [];
var pass = true;





//**************************************************************************************************************************************************
//**************************************************************************************************************************************************
function mainTankMove(e){
  tankMove(e.keyCode, mainTank);
}
function passfinding(obj){
  size = elSize (obj);
  if (size.y1<0 || size.y2>26 || size.x1 < 0 || size.x2 > 26){
    return false;
  }
  else {
  for (var j = size.y1; j <= size.y2; j++) {
      for (var i = size.x1; i <= size.x2; i++) {
          if (map[j][i] != '0') {
              return false;
          }
      }

  }
  return true;
}
} 

/*function intercept(obj1,obj2){
  var  size1 = elSize(obj1);
  var  size2 = elSize(obj2);
  var  dSizeX =  (size1.h - size2.h) /2 ;
  var  dSizeY =  (size1.w - size2.w) /2 ;
  var dx = Math.abs(obj1.x - obj2.x - dSizeX);
  var dy = Math.abs(obj1.y - obj2.y - dSizeY);
  var dh = (size1.h+size2.h)/2;
  var dw = (size1.w+size2.w)/2;
  if (dx <= dw){
    if (dy <= dh){
      return true;
    }
    else return false;
  }
  else return false;
}
function interceptBullet(obj){
  for (i=0 ; i<bullets.length; i++){
      if (obj.enemy != bullets[i].enemy){
        if (intercept(obj, bullets[i])){
          return true;
        }
      }
  }
  return false;
} */
/*function interceptTank(obj){
  var  size = elSize(obj);
  for (i=0 ; i<bots.length; i++){
    var x = bots[i].x,
        y = bots[i].y;
      if (x == obj.x && y == obj.y){
        continue;
      }
      if (obj.x <= x && x <= (obj.x+size.w)){
        if (obj.y <= y && y <= (obj.y+size.h)){
          return true;
        }
      }
  }
  if (!obj.enemy){
    if (obj.x <= x && x <= (obj.x+size.w)){
      if (obj.y <= y && y <= (obj.y+size.h)){
        return true;
      }
    }
  }
} */
//**************************************************************************************************************************************************
//**************************************************************************************************************************************************
  function tankMove(e, tank) {
   // if (tank.explitIntercept(bullets))
    switch (e) {
            
          
              case 37:
              tank.x -= tank.speed;
              pass= ( (passfinding(tank)) && (!tank.explitIntercept(bots)) );
              if (tank.caseOn!=37 || pass!=true) {tank.x +=tank.speed;}
              tank.caseOn=37;
              if (tank.position == tank.left.alt) {
                tank.position = tank.left.main;
              }
              else {
                tank.position = tank.left.alt;
              }
              
              break;
          
              case 38:
              tank.y -= tank.speed;
              pass=( (passfinding(tank)) && (!tank.explitIntercept(bots)) );
              if (tank.caseOn!=38 || pass!=true) {tank.y +=tank.speed;}
              tank.caseOn=38;
              if (tank.position == tank.up.alt) {
                tank.position = tank.up.main;
              }
              else {
                tank.position = tank.up.alt;
              }
              break;

              case 39:
              tank.x += tank.speed;
              pass=( (passfinding(tank)) && (!tank.explitIntercept(bots)) );
              if (tank.caseOn!=39 || pass!=true) {tank.x -=tank.speed;}
             tank.caseOn=39;
              if (tank.position == tank.right.alt) {
                tank.position =tank.right.main;
              }
              else {
                tank.position = tank.right.alt;
              }
              break;

              case 40:
              tank.y += tank.speed;
              pass=( (passfinding(tank)) && (!tank.explitIntercept(bots)) );
              if (tank.caseOn!=40 || pass!=true) {tank.y -=tank.speed;}
              tank.caseOn=40;
              if (tank.position == tank.down.alt) {
                tank.position = tank.down.main;
              }
              else {
                tank.position = tank.down.alt;
              }
              break;
          }
      }

   
 