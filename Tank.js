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
 