/*
*   VARIABLES
*/

var fichas = [
    {'par':'1', 'img':'img/A.jpg'},
    {'par':'2', 'img':'img/B.jpg'},
    {'par':'3', 'img':'img/C.jpg'},
    {'par':'4', 'img':'img/D.jpg'},
    {'par':'5', 'img':'img/E.jpg'},
    {'par':'6', 'img':'img/F.jpg'},
    {'par':'1', 'img':'img/A.jpg'},
    {'par':'2', 'img':'img/B.jpg'},
    {'par':'3', 'img':'img/C.jpg'},
    {'par':'4', 'img':'img/D.jpg'},
    {'par':'5', 'img':'img/E.jpg'},
    {'par':'6', 'img':'img/F.jpg'}
];
var firstClick= null;
var intentos=24;
var aciertos=0;
var puntosIntentos;
var cont=0;
var selected=[];


var pair = [];

function playerName(){
    let div = $('.nameDiv');
    let name = prompt('Please enter your name', '');

    if (name != null) {
        let welcomePerson = `<p id="person">Welcome ${name}!</p>`;
        div.append(welcomePerson);        
    }else{
        let welcome = `<p>Welcome!</p>`;
        div.append(welcome);
    }
}

function displayScore(){
    let div = $('#infoJuego');
    let p = `<p>Movimientos disponibles: ${puntosIntentos}</p>`;
    //no se actualiza el valor :(
    //div.append(p);
    /*function chancesContador(){
        $('#chancesIntentos').text('Intentos: '+ intentos);
    }*/
}

/*
*   Funcion que acomoda de forma aleatoria los divs donde luego iran las fichas
*   @params | fichas[i] - fichas.length
*/

function shuffle(){
    var random=0;
    var x=0;
    for(i=0;i<fichas.length;i++){
        random = Math.round(Math.random()+1); //da un numero random
        x = fichas[i]; //indice, lo necesito para que vaya iterando TODO el array
        fichas[i]=fichas[random]; //asigna el nro random al index de las fichas
        fichas[random]=x; // x = al nro random
    }
    asignTiles(); // la llamo acá para que me asigne los data- despues del shuffle
    console.log(fichas);
}

/*
*   Funcion que asigna a cada div un attr data-par según su index aleatorio y le apendea
*   una imagen con src aleatoria segun el indice del atributo img de cada objeto en el array fichas
*/

function asignTiles(){
        
    $('.ficha').each(function(index,elem){

        $(this).attr('data-par',fichas[index].par); //le asigno el data- = al index. Cambia segun el shuffle
       
        let img ='<img class="hidden" src="'+fichas[index].img+'">';
        var ficha = $("#ficha"+(index+1));
        ficha.append(img);   
    });
}

/*
*   Funcion que intercala entre frente y dorso de cada ficha
*   @params | firstClick - lastClick
*/

function flip(firstClick, lastClick){
    firstClick.toggleClass('visible hidden');
    lastClick.toggleClass('visible hidden');
};

/*
*   Funcion llamada al ganar
*/

function victory(){
    if(aciertos==6){
        alert('VICTORY!');
    }
}

/*
*   Funcion llamada al perder
*/

function gameOver(){
    if(intentos==0){
        alert('GAME OVER!');
    }
}

/*
*   Listeners
*/

$('.ficha').on('click', function(){

    if(cont < 2){
        cont++;
        
            $(this).children().first().toggleClass('visible hidden'); //me trae la imagen y no el div y cambia la clase
            console.log($(this).children().first()); //consolea la img (hija del div)
        
            if(firstClick == null){
                firstClick= $(this).children().first();
                console.log('first: '+firstClick);
                selected.push(firstClick);
                firstClick.parent().addClass('noPointer'); // para que no permita un segundo click sobre el elemento

            }else{
                var lastClick= $(this).children().first();
                console.log('last: '+lastClick);
                selected.push(lastClick);
                lastClick.parent().addClass('noPointer'); // para que no permita un segundo click sobre el elemento
                            
                console.log(firstClick.parent()); 
                
                console.log('selected: '+selected);  
                
                

                    if(firstClick.attr('src') == lastClick.attr('src')//&& selected[0].parent().attr('id') != selected[1].parent().attr('id')
                        && firstClick.parent().attr('id') != lastClick.parent().attr('id')){

                        console.log("MATCH! :D");
                        selected.splice(0,1);
                        selected=[];
                        aciertos++;
                        console.log('aciertos: '+aciertos); 
                    
                        firstClick= null;
                        lastClick= null; 
                            
                    
                    }else{
                        firstClick.parent().addClass('background');
                        firstClick.parent().removeClass('noPointer'); // para poder clickear de nuevo
                        lastClick.parent().removeClass('noPointer'); // para poder clickear de nuevo

                        selected=[];
                        setTimeout(flip, 1200, firstClick, lastClick);
                        intentos--;
                        console.log('intentos: '+intentos);
                       
                    }
                firstClick= null;
                lastClick= null;
            }
        
    }   
    victory();
    gameOver();
});

$('#btnRestart').on('click', function(){
    console.log('hola');
    intentos=24;
    console.log(intentos);
    aciertos=0;
    console.log(aciertos);
    shuffle();
});

/*
*   Llamada a funciones
*/

shuffle();
playerName();
displayScore();





