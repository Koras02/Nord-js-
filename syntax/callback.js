/*
function a() {
  console.log('A');
}
*/
var a = function a() {
  console.log('A');
}


function slowfunc(callback){
   callback();
}

slowfunc(a);
