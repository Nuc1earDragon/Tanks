function Tank(X,Y,type) {
  this.up =  {
    main : this.getImage(type, "up","s1"),
    alt : this.getImage(type, "up","s2") ,
  };
  this.left= {
  main : this.getImage(type, "left", "s1"),
  alt : this.getImage(type, "left", "s2"),
  };
  this.right= {
    main : this.getImage(type, "right", "s1"),
    alt : this.getImage(type, "right", "s2"),
    };
  this.down= {
    main : this.getImage(type, "down", "s1"),
    alt:  this.getImage(type, "down", "s2"),
    };
  this.x= X;
  this.y= Y;
  this.position=new Image();
  this.caseOn = 40;
  this.enemy = false;
  this.speed = 2;
  this.healthPoints = 1;
  this.crashed = false;
  this.crashIcon = new Image();
  this.crashIcon.src="./img/hit2.png";
  this.publicIntercept = new TankInterceptor().publicIntercept; 
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
  Tank.prototype.getHit = function() {
    if (this.crashed == true){
      return;
    };
    this.healthPoints-=1;
    if (this.healthPoints<=0){
        this.position = this.crashIcon;
        this.speed = 0;
        var a = this;
        setTimeout(function(){destroy(a)}, 500);
    }
    else return;
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
  if (obj.y<0 || size.y2>25 || obj.x < 0 || size.x2 > 25){
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

//**************************************************************************************************************************************************
//**************************************************************************************************************************************************
  function tankMove(e, tank) {
   // if (tank.publicIntercept(bullets))
    switch (e) {
            
          
              case 37:
              tank.x -= tank.speed;
              pass= ( (passfinding(tank)) && (!tank.publicIntercept()) );
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
              pass=( (passfinding(tank)) && (!tank.publicIntercept()) );
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
              pass=( (passfinding(tank)) && (!tank.publicIntercept()) );
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
              pass=( (passfinding(tank)) && (!tank.publicIntercept()) );
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

   
 