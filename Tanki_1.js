                window.onload = function() {
                    game = new Game();
                    map = new Map();
                    map.draw();
                    game.context.drawImage(game.mainTank.up.main, game.mainTank.x, game.mainTank.y,30,30);
                    
                    window.addEventListener("keydown", mainTankMove);
                   
                    window.addEventListener("keydown", mainTankBullet);

                   
                    game.mainInterval = setInterval(function (){
                        map.draw();
                        game.context.drawImage(game.mainTank.position, game.mainTank.x, game.mainTank.y,30,30);
                        bulletFly();
                        createBot();
                        botMove();
                        }
                       , 25);
                       
                }
                    
