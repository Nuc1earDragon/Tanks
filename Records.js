function getRecords(){
    var arr = new Array();
    for (var i=0; i<10; i++){

        arr [i] = (i+1) +". " + localStorage.getItem('Record'+[i]);
    }
    
   var str =  arr.join("</p><p>");
    return str;
}
function setRecords(){
    var arr = new Array();
    for (var i=0; i<11; i++){

        arr [i] = localStorage.getItem('Record'+[i]);
        if (arr[i] == "null") arr[i]= 0;
    }
    arr.sort(compareNumeric);
    arr.splice(10,1);
    for (var i=0; i<11; i++){
        localStorage.setItem('Record'+[i], arr[i]);
    }
}
function compareNumeric(a, b) {
    return -1*(a - b);
  }