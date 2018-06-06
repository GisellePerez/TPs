/*
*   VARIABLES
*/

var fichas = [
    {'par':'1', 'img':'img/A.jpg'},{'par':'2', 'img':'img/B.jpg'},{'par':'3', 'img':'img/C.jpg'},
    {'par':'4', 'img':'img/D.jpg'},{'par':'5', 'img':'img/E.jpg'},{'par':'6', 'img':'img/F.jpg'},
    {'par':'1', 'img':'img/A.jpg'},{'par':'2', 'img':'img/B.jpg'},{'par':'3', 'img':'img/C.jpg'},
    {'par':'4', 'img':'img/D.jpg'},{'par':'5', 'img':'img/E.jpg'},{'par':'6', 'img':'img/F.jpg'}];

var arrayLevels =['Fácil','Intermedio','Experto'];
var firstClick= null;
var intentos;
var aciertos=0;
var cont=0;
var selected=[];
var puntaje=0;
var puntajeFinal=0;
var playerName; /*usada en función getPlayerName*/
var playerInfo = {};
var players = [];
var datosGuardados = localStorage.getItem('players');
var lost=false; var won=false;



/*
*   Funcion para ingresar nombre
*/

function getPlayerName(){
    let div = $('#nameDiv');
    playerName = $('#playerNameInput').val();
    console.log('name '+playerName);

    if(playerName != '') {
        let welcomePerson = `<p class="person">Bienvenida/o <span id = "playerName">${playerName}</span>!</p>`;
        div.append(welcomePerson);
    }else{
        let welcome = `<p class="person">Bienvenida/o!</p>`;
        div.append(welcome);
    }

}

function loadLvlOptions() {
    for(var i=0 ; i<arrayLevels.length ; i++){
        var option = `<option value="${arrayLevels[i]}"></option>`; 
        option.text(arrayLevels[i]);
        $('#docType').append(option);
    }
}
/*
*  Spinner 
*/
/*
$.widget("ui.textSpinner", $.ui.spinner, {
    options: {
        wrap: true
    },
    _parse: function (value) {                                                                                                                                              
        if ((value === '') || isNaN(value)) {
            value = this.options.values.indexOf(value);
            if (value === -1) {
                value = 0;
            }
        }
        if (value < 0) {
            value = this.options.wrap ? (this.options.values.length -1) : 0;
        } else if (value >= this.options.values.length) {
            value = this.options.wrap ? 0 : (this.options.values.length - 1);
        }
        return value;
    },
    _format: function (value) {
        return this.options.values[value];
    },
    _adjustValue: function (value) {
        if (value < 0) {
            value = this.options.wrap ? (this.options.values.length - 1) : 0;
        } else if (value >= this.options.values.length) {
            value = this.options.wrap ? 0 : (this.options.values.length - 1);
        }
        return value;
    }
}); 

$(function() {
    $("#spinner").textSpinner({
        values: arrayLevels,
        spin: function( event, ui ) {
           $( "#spinner-val" ).text(ui.value);
        }
    });
});
*/

/**
 * Listenner del boton para elegir el nivel
 */

$('#jugar').on('click', function() {

    $('#welcomeDiv').hide();

    console.log( $('#spinner-val').text() );
    let level = ( $('#spinner-val').text() );

    switch(level) {        
        case '0'/*fácil*/: intentos = 18; break;        
        case '1'/*Intermedio*/: intentos = 12; break;        
        case '2'/*Experto*/: intentos = 8; break;        
        default: 'No level';
    }
    //console.log(intentos); //ahora pasarlo al append
    getPlayerName();
    displayMoves(intentos);

    return intentos;    
});

/*
*   Funcion que carga los intentos
*   @ params | intentos
*/

function displayMoves(intentos){
    let div = $('#infoJuego');
    let p = $('#intentosP').text('Intentos: '+ intentos);
    div.append(p);
}

/*
*   Funcion que carga el puntaje
*   @ params | puntaje
*/

function displayScore(puntaje) {
    let div = $('#infoJuego');
    let = scoreP = $('#scoreP').text('Puntaje: '+ puntaje);
    div.append(scoreP);
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
        setTimeout(function(){ alert('VICTORY!'); /*displayRanking();*/}, 400); 
        won=true; //bandera
        console.log('won: '+won);       
    }
    //savePlayerData();
    console.log('llamo a victory');  
}

/*
*   Funcion llamada al perder
*/

function gameOver(){
    if(intentos==0 && lost == false /*si no pongo el booleano funciona en todos los clicks*/){
        setTimeout(function(){ alert('GAME OVER!');  /*displayRanking();*/ }, 400); 
        lost=true;
        console.log('lost: '+lost);              
    }
    //savePlayerData();
    console.log('llamo a game over');
}

function savePlayerData(name,score){
    console.log('llamo a savePlayerData');
    console.log('playerName :'+playerName);
    console.log('puntajeFinal :'+puntajeFinal);

    playerInfo = {'name': playerName, 'score': puntajeFinal};
    console.log('playerInfo: '+playerInfo);

    if(datosGuardados==null){
        players = [];
    }else{
        players = JSON.parse(datosGuardados).players; 
    }
    console.log('datos guardados: '+datosGuardados);
    players.push(playerInfo);

    let jsonPlayerInfo = {'players':players,'total':players.length}
    console.log('jsonPlayerInfo: '+jsonPlayerInfo);

    let data = JSON.stringify(jsonPlayerInfo);
    
    localStorage.setItem('players',data);

    console.log('players:'+players);

}

function displayRanking() {

     if(lost==true || won == true ) {   
       
        $( "#dialogRanking" ).removeClass('displayRanking');
        $( "#dialogRanking" ).addClass('displayRanking');
    
        for(var i=0; i<players.length; i++){
            var playerNameList = players[i].name;
            var playerScoreList = players[i].score;
        }  

        $( "#dialogRanking" ).append(playerNameList);
        $( "#dialogRanking" ).append(playerScoreList);

    }
}
/*
function checkWin() {
    if(won == true || lost == true ){
        console.log(playerName);
        console.log(puntajeFinal);
        savePlayerData(playerName, puntajeFinal);
        //displayRanking();
        
    }
} */    

/*
*   Listeners
*/

$('.ficha').on('click', function(){
    if (cont < 2){  //para evitar más de dos click por turno   
        $(this).children().first().toggleClass('visible hidden'); //me trae la imagen y no el div y cambia la clase
        console.log($(this).children().first()); //consolea la img (hija del div)
               
        if(firstClick == null){
            firstClick= $(this).children().first();
            console.log('first: '+firstClick);
            firstClick.parent().addClass('noPointer'); // para que no permita un segundo click sobre el elemento
                   
        }else{
            var lastClick= $(this).children().first();
            console.log('last: '+lastClick);
            lastClick.parent().addClass('noPointer'); // para que no permita un segundo click sobre el elemento      
            console.log('selected: '+selected);         
                 
                if(firstClick.attr('src') == lastClick.attr('src')//&& selected[0].parent().attr('id') != selected[1].parent().attr('id')
                    && firstClick.parent().attr('id') != lastClick.parent().attr('id')){

                    console.log("MATCH! :D");                            
                    console.log('sel: '+selected.length);
                            
                    aciertos++;
                    console.log('aciertos: '+aciertos); 
                    firstClick= null;
                    lastClick= null;                  
                    puntaje = puntaje += 100;
                    console.log('algo match');    
                    
                }else{

                    firstClick.parent().addClass('background');
                    firstClick.parent().removeClass('noPointer'); // para poder clickear de nuevo
                    lastClick.parent().removeClass('noPointer'); // para poder clickear de nuevo

                    setTimeout(flip, 800, firstClick, lastClick);
                    intentos--;
                    console.log('intentos: '+intentos);                    
                    if (puntaje > 0){ //para que no tenga valores negativos
                        console.log('algo no match');
                        puntaje = puntaje -= 20;
                    }
                   
                }
    
            firstClick= null;
            lastClick= null;
            selected=[]; 
                              
        }
        cont++; //Acá cuenta bien
        console.log('contadorIf: '+cont);
        console.log('puntaje final :'+puntaje); //acá toma el puntaje final

        
        //displayScore(puntaje);
        //displayMoves(intentos);
        //savePlayerData();
        //victory();
        //gameOver(); 
        
              
    }
    if(cont == 2){
        setTimeout(function(){ cont=0; console.log('contadorElse: '+cont);}, 800); 
        //con tiempo porque sino vuelve a 0 antes de que las teclas se den vuelta 
    }

    if(intentos == 0 || aciertos == 6){
        puntajeFinal = puntaje;
        console.log('puntaje final : '+puntajeFinal);
    }
    displayScore(puntaje);
    displayMoves(intentos);
    victory();
    gameOver();
    checkWin();
});

/*
*   Llamada a funciones
*/

shuffle();
//getPlayerName();
displayScore(puntaje); //para que aparezca (en cero) antes de comenzar los intentos.
//checkWin();
//victory();
//gameOver();

//localStorage.clear();





