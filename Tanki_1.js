                window.onload = function() {
                    game = new Game();
                    map = new Map(game);
                    map.draw(game);
                    game.context.drawImage(game.mainTank.up.main, game.mainTank.x, game.mainTank.y,30,30);
                    
                    window.addEventListener("keydown", mainTankMove);
                   
                    window.addEventListener("keydown", mainTankBullet);

                   
                    int = setInterval(function (){
                        map.draw(game);
                        game.context.drawImage(game.mainTank.position, game.mainTank.x, game.mainTank.y,30,30);
                        bulletFly(game);
                        createBot();
                        botMove(game);
                        }
                       , 25);
                       
                       
                       
                }
                    
