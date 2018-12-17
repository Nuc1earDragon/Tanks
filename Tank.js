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
  this.enemy = true;
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
  function tankMove(e, tank) {
   
    switch (e) {
            
          
              case 37:
              tank.x -= tank.speed;
              pass=passfinding(e, tank);
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
              pass=passfinding(e, tank);
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
              pass=passfinding(e, tank);
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
              pass=passfinding(e, tank);
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
      function mainTankMove(e){
        tankMove(e.keyCode, mainTank);
      }
   
 