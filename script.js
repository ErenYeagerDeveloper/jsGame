var stack = [];
var free = true;
var proc = false;

function newGame(){
    proc = false;
    var f = document.myForm.elements;
    stack = [];

    var masNum = [' ',1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    
    for (var  i = 0; i < 16; i ++)
    {
        f[i].value = masNum[i];
    }   

    for(var i = 0; i < 1000; i++){
         
         game(Math.floor(Math.random() * 16));
    }
    
    while(f[15].value != ' '){
          game(Math.floor(Math.random() * 16));
    }

}

  function swap(n, m){
     var f = document.myForm.elements;
     
     [f[n].value, f[m].value] = [f[m].value, f[n].value]
  }
     
  function game(n){
    var f = document.myForm.elements;
    
    if ((n % 4 != 3) && (f[n + 1].value == ' ')) {
      swap(n, n + 1); //проверяем кнопку справа если она есть
      stack.push([n + 1, n]);
    }
    if ((n % 4 != 0) && (f[n - 1].value == ' ')) {
      swap(n, n - 1); //проверяем кнопку слева если она есть 
      stack.push([n - 1, n]);
    }
    if ((n <= 11) && (f[n + 4].value == ' ')) {
      swap(n, n + 4); //проверяем кнопку внизу
      stack.push([n + 4, n]);
    }
    if ((n >= 4) && (f[n - 4].value == ' ')) {
      swap(n, n - 4); //проверяем кнопку вверху 
      stack.push([n - 4, n]);
    }
  }

  async function solve(){
    drop = false;
    if(!free) {
      console.log('already solves');
      return;
    }

    free = false;
    var length = stack.length;
    var f = document.myForm.elements;

    proc = true;
    for(var i = 0; i < length; i++){
      var a = stack.pop();
      swap(a[0],a[1]);

      await new Promise(r => setTimeout(r, 200));
      if(proc == false) {
        free = true;
        return;
      }
      // если была нажата кнопка play выйти из цикла
    }

    free = true;
  }

  