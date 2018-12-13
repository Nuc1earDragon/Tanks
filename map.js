var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var cellSize = 16;

var x1, y1, x2, y2;
var step=2;
var pass=true;

// Массив карты поля боя
var map = [
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0],
[0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0],
[0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0],
[0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0],
[0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 'K', 'K', 'S' , 'S' , 'K', 'K', 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0],
[0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 'K', 'K', 'S' , 'S' , 'K', 'K', 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0],
[0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0],
[0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0],
[0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
['K', 'K', 0, 0, 'K', 'K', 'K', 'K', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'K', 'K', 'K', 'K', 0, 0, 'K', 'K'],
['S' , 'S', 0, 0, 'K', 'K', 'K', 'K', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'K', 'K', 'K', 'K', 0, 0, 'S', 'S' ],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'K', 'K', 'K', 'K', 'K', 'K', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 'K', 'K', 'K', 'K', 'K', 'K', 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0],
[0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0],
[0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0],
[0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0],
[0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0],
[0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0],
[0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0, 0, 'K', 'K', 'K', 'K', 0, 0, 0, 'K', 'K', 0, 0, 'K', 'K', 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'K', 0, 0, 'K', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'K', 0, 0, 'K', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var images = {
brick : new Image(),
steel : new Image(),
background: new Image()
}
images.brick.src="./img/brick-wall.png";
images.steel.src="./img/steel-wall.png";
images.background.src="./img/2.png"

canvas.width = 26*cellSize;
canvas.height = 26*cellSize;

function drawMap() {
    context.drawImage(images.background,0,0, canvas.width, canvas.height);
    for (var j=0; j<26; j++)
      for (var i=0; i<26; i++) {
        switch (map[j][i]) {
      /*    case 0:
          context.fillStyle = "#008000";
          context.fillRect(i*cellSize, j*cellSize,cellSize,cellSize);

          break; */
          case 'K':
          context.drawImage(images.brick,i*cellSize, j*cellSize);
          context.drawImage(images.brick,i*cellSize +images.brick.width, j*cellSize );
          context.drawImage(images.brick,i*cellSize, j*cellSize +images.brick.height);
          context.drawImage(images.brick,i*cellSize +images.brick.width, j*cellSize +images.brick.height);
            break;
          case 'S' :
          context.drawImage(images.steel,i*cellSize, j*cellSize);
            break;
                }
          }
    }
    