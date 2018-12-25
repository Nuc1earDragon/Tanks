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





//**************************************************************************************************************************************************
//**************************************************************************************************************************************************
function mainTankMove(e){
  tankMove(e.keyCode, mainTank);
}
function passfinding(obj){
  size = elSize (obj);
  var i2 = 0, 
      j2 = 0, 
      a = true;
  for (j2 = size.y1; j2 <= size.y2; j2++) {
      for (i2 = size.x1; i2 <= size.x2; i2++) {
          if (map[j2][i2] != '0') {
              a = false;
          }
      }

  }
  return a;
} 

function intercept(obj1,obj2){
  var  size = elSize(obj1);
  var dx = Math.abs(obj1.x - obj2.x);
  var dy = Math.abs(obj1.y - obj2.y);
  if (dx <= size.w){
    if (dy <= size.h){
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
}
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
   
    switch (e) {
            
          
              case 37:
              tank.x -= tank.speed;
              pass=passfinding(tank);
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
              pass=passfinding(tank);
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
              pass=passfinding(tank);
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
              pass=passfinding(tank);
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

   
 