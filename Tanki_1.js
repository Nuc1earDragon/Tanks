                window.onload = function() {
                    drawMap();
                    context.drawImage(mainTank.up.main, mainTank.x, mainTank.y,30,30);
                    
                    window.addEventListener("keydown", mainTankMove, true);
                   
                    window.addEventListener("keydown", mainTankBullet, true);

                   
                       setInterval(function (){
                        drawMap();
                        context.drawImage(mainTank.position, mainTank.x, mainTank.y,30,30);
                        bulletFly();
                        createBot();
                        botMove();
                        drawCrash();
                        }
                        
                       , 25);
                       
                       
                       
                }
                    
