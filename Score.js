const fs = require('fs');
function compareNumeric(a, b) {
    return a - b;
  }
Game.prototype.writeScore = function(){
let score = new Array();
let score_records = fs.readFileSync("Score.txt","utf8");
score = score_records.split(", ");
score.push (game.score);
score.sort(compareNumeric);
score.splice(10,1);
}
Game.prototype.readScore = function(){
    let score = new Array();
    let score_records = fs.readFileSync("Score.txt","utf8");
    score = score_records.split(", ");
    return score;
}