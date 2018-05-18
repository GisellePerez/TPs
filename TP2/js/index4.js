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

var pair = [];

function playerName(){
    let div = $('.nameDiv');
    let name = prompt('Please enter your name', '');

    if (name != null) {
        //$('#person').html = 'Welcome'  + person + "! Let's play!";
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
    //no se actualiza el valor :/
    //div.append(p);
}

/*
*   Funcion que acomoda de forma aleatoria los divs donde luego iran las fichas
*   @params | fichas[i] - fichas.length
*/

function shuffle(){
    var random=0;
    var x=0;
    for(i=0;i<fichas.length;i++){
        random = Math.round(Math.random()+1); //tira un numero random
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

        $(this).attr('data-par',fichas[index].par); //le asigno el data- = al index. Debería cambiar segun el shuffle
       
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
    $(this).children().first().toggleClass('visible hidden'); //me trae la imagen y no el div y cambia la clase
    console.log($(this).children().first()); //consolea la img (hija del div)
    
    if (cont < 2){
        cont++;
        if(firstClick == null){
            firstClick= $(this).children().first();
            console.log('first: '+firstClick);
        }else{
            var lastClick= $(this).children().first();
            console.log('last: '+lastClick);             
                                
                
                if(firstClick.attr('src') == lastClick.attr('src')){
                    console.log("MATCH! :D");
                    aciertos++;
                    console.log('aciertos: '+aciertos);
                    
                    firstClick= null;
                    lastClick= null;       
                
                }else{
                    setTimeout(flip, 1200, firstClick, lastClick);
                    intentos--;
                    console.log('intentos: '+intentos);
                }
                firstClick= null;
                lastClick= null;
            
        }
        victory();
        gameOver();
    }    
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





