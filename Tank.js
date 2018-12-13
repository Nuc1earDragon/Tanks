function Tank(X,Y,type) {
  this.up =  {
    main : getImage(type, "up","main"),
    alt : getImage(type, "up","alt") ,
  };
  this.left= {
  main : getImage(type, "left", "main"),
  alt : getImage(type, "left", "alt"),
  hit: getImage(type, "left", "hit"),
  };
  this.right= {
    main : getImage(type, "right", "main"),
    alt : getImage(type, "right", "alt"),
    hit: getImage(type, "right", "hit"),
    };
  this.down= {
    main : getImage(type, "down", "main"),
    alt:  getImage(type, "down", "alt"),
    hit: getImage(type, "down", "hit"),
    };
  this.x= X;
  this.y= Y;
  this.position=new Image();
  this.caseOn = 40;
     function getImage(tankType, direction,alternative) {
       var src="";
      switch (tankType){
        case "main": 
        switch(direction){
          case "up":
          if (alternative=="main") src="./img/tank1-up-s1_1.png";
          else src="./img/tank1-up-s2_1.png";
          break;
          case "down":
          if (alternative=="main")  src="./img/tank1-down-s1_1.png";
          else src="./img/tank1-down-s2_1.png";
          break;
          case "right":
          if (alternative=="main")  src= "./img/tank1-right-s1_1.png";
          else src="./img/tank1-right-s2_1.png";
          break;
          case "left":
          if (alternative=="main")  src="./img/tank1-left-s1_1.png";
          else src="./img/tank1-left-s2_1.png";
          break;
        };
        break;
        case "bot":
        switch(direction){
          case "up":
          if (alternative=="main") src="./img/normal-bot-up-s1_1.png";
          else  if(alternative=="alt") src="./img/normal-bot-up-s2_1.png";
          else src="./img/normal-bot-up-s1-blink.png";
          break;
          case "down":
          if (alternative=="main")  src="./img/normal-bot-down-s1_1.png";
          else  if(alternative=="alt") src="./img/normal-bot-down-s2_1.png";
          else src="./img/normal-bot-down-s1-blink.png";
          break;
          case "right":
          if (alternative=="main")   src= "./img/normal-bot-right-s1_1.png";
          else  if(alternative=="alt")  src="./img/normal-bot-right-s2_1.png";
          else src="./img/normal-bot-right-s1-blink.png";
          break;
          case "left":
          if (alternative=="main")  src="./img/normal-bot-left-s1_1.png";
          else if(alternative=="alt") src="./img/normal-bot-left-s2_1.png";
          else src="./img/normal-bot-left-s1-blink.png";
          break;
        };
        break;
      }
      var image= new Image();
      image.src=src;
      return image;
    }
  }
    
function Bullet(X, Y, bulletPos ) {
  this.image = getImage(bulletPos);
  this.x= X;
  this.y= Y;
  this.bulletPos= bulletPos;
  this.enemy = false;
  this.CrashIcon = new Image();
  this.CrashIcon.src="./img/hit1.png";
  this.speed = 2;
  function getImage(bulletPos){
    var src="";
    switch (bulletPos){
      case "up":
      src="./img/bullet-up.png";
      break;

      case  "down":  
      src="./img/bullet-down.png";
      break;

      case "right":
      src="./img/bullet-right.png";
      break;

      case "left":
      src="./img/bullet-left.png";
      break;
    }
    var image= new Image();
    image.src=src;
    return image;
  };
}
var mainTank = new Tank(192,208,"main");
mainTank.caseOn = 38;
var move_count= 1;
mainTank.position=mainTank.up.main;
//var n=-1;
var fps = 1000/60;
var bullets = [];





//**************************************************************************************************************************************************
//**************************************************************************************************************************************************

function passfinding(Key, tank) {
    x1=parseInt((tank.x)/16);
    y1=parseInt((tank.y)/16); 
    x2=parseInt((tank.x+31)/16);
    y2=parseInt((tank.y+31)/16);
    
    switch (Key) {
          
              case 37:

                for (j=y1;j<=y2;j++){
                  if (tank.x<0) {return false}
                    if (map[j][x1]!=0) {
                         return false}
                    }
                    
                return true;
                  
               
              case 38:

                for (i=x1;i<=x2;i++){
                  if (tank.y<0) {return false}
                    if (map[y1][i]!=0) {
                        return false}
                }
                
                return true;
                  
              case 39:

                for (j=y1;j<=y2;j++){
                  if ((tank.x+32)>416) {return false}
                    if (map[j][x2]!=0) {
                        return false}
                    }
                
                return true;
                  

              case 40:

                for (i=x1;i<=x2;i++){
                  if ((tank.y+32)>416) {return false}
                    if (map[y2][i]!=0) {
                         return false}
                    }
                
                return true;
                  
          
      }
    }
//**************************************************************************************************************************************************
//**************************************************************************************************************************************************
  function tankMove(e, Tank,speed) {
   
    switch (e) {
            
          
              case 37:
              Tank.x -= speed;
              pass=passfinding(e, Tank);
              if (Tank.caseOn!=37 || pass!=true) {Tank.x +=speed;}
              Tank.caseOn=37;
              if (Tank.position == Tank.left.alt) {
                Tank.position = Tank.left.main;
              }
              else {
                Tank.position = Tank.left.alt;
              }
              
              break;
          
              case 38:
              Tank.y -= speed;
              pass=passfinding(e, Tank);
              if (Tank.caseOn!=38 || pass!=true) {Tank.y +=speed;}
              Tank.caseOn=38;
              if (Tank.position == Tank.up.alt) {
                Tank.position = Tank.up.main;
              }
              else {
                Tank.position = Tank.up.alt;
              }
              break;

              case 39:
              Tank.x += speed;
              pass=passfinding(e, Tank);
              if (Tank.caseOn!=39 || pass!=true) {Tank.x -=speed;}
             Tank.caseOn=39;
              if (Tank.position == Tank.right.alt) {
                Tank.position =Tank.right.main;
              }
              else {
                Tank.position = Tank.right.alt;
              }
              break;

              case 40:
              Tank.y += speed;
              pass=passfinding(e, Tank);
              if (Tank.caseOn!=40 || pass!=true) {Tank.y -=speed;}
              Tank.caseOn=40;
              if (Tank.position == Tank.down.alt) {
                Tank.position = Tank.down.main;
              }
              else {
                Tank.position = Tank.down.alt;
              }
              break;
          }
      }
      function mainTankMove(e){
        tankMove(e.keyCode, mainTank,2);
      }
      function mainTankBullet(e){
        tankBullet(e.keyCode, mainTank,false);
      }
 