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
var intentos=0;
var aciertos=0;
var puntosIntentos;
var cont=0;
var selected=[];
var playerName;
var puntajeFinal=0;
var puntaje=0;
var lost=false; 
var won =false;

/*
*   Funcion que carga las options para seleccionar el nivel
*/

function loadLvlOptions() {
    for(var i=0 ; i<arrayLevels.length ; i++) {
        var option = `<option class="levelOp" value="${arrayLevels[i]}">${arrayLevels[i]}</option>`; 
        $('#lvlSelect').append(option);
    }
}

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
        playerName = 'Anon';
        let welcome = `<p class="person">Bienvenida/o! <span id = "playerName">${playerName}</span></p>`;
        div.append(welcome);
    }
}

/*
*   Funcion que carga los intentos
*   @ params | intentos
*   return intentos
*/

function displayMoves(intentos){
    let div = $('#infoJuego');
    let p = $('#intentosP').text('Intentos: '+ intentos);
    div.append(p);
}


/*
*   Funcion que muestra los puntos
*   @ | puntaje
*   return puntaje
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
        random = Math.round(Math.random()+1);
        x = fichas[i]; 
        fichas[i]=fichas[random]; 
        fichas[random]=x; 
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
    let victoryP = `<p class="rankingTitle"> Victory! </p>`;
    if(aciertos==6){
        won=true; //bandera
        setTimeout(function(){ $('#rankingTitleDiv').append(victoryP); displayRanking(); }, 500);         
    }
}

/*
*   Funcion llamada al perder
*/

function gameOver(){
    let gameOverP = `<p class="rankingTitle"> Game over </p>`;
    if(intentos==0 && lost == false /*si no pongo el booleano funciona en todos los clicks*/){
        lost=true; //bandera  
        setTimeout(function(){ $('#rankingTitleDiv').append(gameOverP); displayRanking(); }, 500);              
    }
}

/*
*   Funcion que guarda los datos del jugador actual en el localStorage y lo pushea en un array players.
*   Luego de ordenar el array según el score de cada jugador, se hace el stringify y el setItem
*/
  
function savePlayerData() {
    var jsonPlayerInfo;
    var players;  
    let datosGuardados = localStorage.getItem("players");

    if (datosGuardados == null) {
        players = [];
    } else {
        players = JSON.parse(datosGuardados).players;
    }
  
    let data = { name: playerName, score: puntajeFinal }; //desordenado
    players.push(data);  
    sortedPlayers = players.sort((a, b) => b.score - a.score); //ordena de mayor a menor puntaje

    jsonPlayerInfo = { players: sortedPlayers, total: sortedPlayers.length }; //ordenado :D
    let jsonPlayer = JSON.stringify(jsonPlayerInfo);
    localStorage.setItem("players", jsonPlayer);
} 

/*
* Función que muestra la información alojada en el localStorage 
*/

function showPlayerData() {
    let datosGuardadosParse = JSON.parse(localStorage.getItem("players"));
    let rankingInfoDiv = $('#rankingInfoDiv');
    //let ul = $("<ul></ul>").addClass('rankingUl');

    for (var i = 0; i < datosGuardadosParse.players.length; i++) {
        let div = `<div><p class="rankingNames">${datosGuardadosParse.players[i].name}</p> 
                    <p class="rankingScores">${datosGuardadosParse.players[i].score}</p></div>`        
        rankingInfoDiv.append(div);
        //cambiar el display del div pop up y organizar la info
    }
}

function displayRanking(){
    $('#rankingDiv').removeClass('noDisplayRanking'); 
    $('#rankingDiv').addClass('displayRanking'); 
    $('.ficha').addClass('noPointer');
}
    
/*
*   Listeners
*/

$('#jugar').on('click', function(){

    if($('#lvlSelect').children().first().val() == -1){ //pensar ua mejor condicion

        console.log('elegir nivel');

        $('#welcomeDiv').hide();
        //let level = ( $('#spinner-val').text() );
        let level = ($("#lvlSelect option:selected").val()); //también funciona con .text()

        switch(level) {
            case 'Fácil': intentos = 18; break;        
            case 'Intermedio': intentos = 12; break;        
            case 'Experto': intentos = 8; break;        
            default: 'No level';        
        }
        getPlayerName();
        displayMoves(intentos);
        displayScore(puntaje); 
    }     
});

$('.ficha').on('click', function(){
    if (cont < 2){  //para evitar más de dos click por turno   
        $(this).children().first().toggleClass('visible hidden'); //me trae la imagen y no el div y cambia la clase
               
        if(firstClick == null){
            firstClick= $(this).children().first();
            console.log('first: '+firstClick);
            firstClick.parent().addClass('noPointer'); // para que no permita un segundo click sobre el elemento
            $(firstClick).effect( "pulsate", {times:2}, "slow"); /* EFECTO */   
                   
        }else{
            var lastClick= $(this).children().first();
            console.log('last: '+lastClick);
            lastClick.parent().addClass('noPointer'); // para que no permita un segundo click sobre el elemento
            $(lastClick).effect( "pulsate", {times:2}, "slow"); /* EFECTO */        
                if(firstClick.attr('src') == lastClick.attr('src')
                    && firstClick.parent().attr('id') != lastClick.parent().attr('id')){

                    aciertos++;
                    puntaje = puntaje += 100;                      
                    firstClick= null;
                    lastClick= null;   

                }else{

                    firstClick.parent().addClass('background');
                    firstClick.parent().removeClass('noPointer'); // para poder clickear de nuevo
                    lastClick.parent().removeClass('noPointer'); // para poder clickear de nuevo
                    setTimeout(flip, 800, firstClick, lastClick);
                    intentos--;
                    if (puntaje > 0){ //para que no tenga valores negativos
                        console.log('algo no match');
                        puntaje = puntaje -= 20;
                    }
                }   

            firstClick= null;
            lastClick= null;                   
        }
        cont++; 
        console.log('contadorIf: '+cont);                         
    }
    if(cont == 2){
        setTimeout(function(){ cont=0; console.log('contadorElse: '+cont);}, 800); //con tiempo porque sino vuelve a 0 antes de que las teclas se den vuelta 
    }
    victory();
    gameOver();
    displayMoves(intentos);
    displayScore(puntaje);

    if(intentos == 0 || aciertos == 6){
        puntajeFinal = puntaje;
        console.log('puntaje final : '+ puntajeFinal);
        console.log('nombre: ' + playerName);
        savePlayerData();  
        showPlayerData();        
    }
});

$('#restart').on('click', function(){
        window.location.reload();
});
  
/*
*   Llamada a funciones
*/
shuffle();
loadLvlOptions();
//localStorage.clear();


