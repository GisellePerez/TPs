//puedo asignarle el data-par a dos imagenes y que con un evento de click me valide el data-par

//var fichas = [1,1,2,2,3,3,4,4,5,5,6,6];

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

function shuffle(){
    var random=0;
    var x=0;
    for(i=0;i<fichas.length;i++){
        random = Math.round(Math.random()+1); //tira un numero random
        x = fichas[i]; //indice, lo necesito para que vaya iterando TODO el array
        fichas[i]=fichas[random]; //asigna el nro random al index de las fichas
        fichas[random]=x; // x = al nro random
    }
    asignarFichas(); // la llamo acá para que me asigne los data- despues del shuffle
    console.log(fichas);
}

function asignarFichas(){

    $('.ficha').each(function(index){
        $(this).attr('data-par',fichas[index].par); //le asigno el data- = al index. Debería cambiar segun el shuffle
        $(this).attr('src','"'+fichas[index].img+'"');//let img = $(this).css('background-image', 'url(' + fichasImg[index] + ')');
        
        console.log('"'+fichas[index].img+'"');
    });
}

$('.ficha').on('click', function(){
    asignarFichas();
    let dataPar = $(this).attr('data-par');
    console.log(dataPar)
    let currentTile = $(this);
    //console.log(currentTile); OK
    //$(this).html('<p>'+$(this).data('par')+'</p>'); //PROBANDO: me pone un p con el data de c/u    
    let flipped = $(this).addClass('flipped'); 
    //$('.ficha').each(function(index){
        
        //flipped.css('backgroundImage', 'url(' + fichas.img + ')');
        //let img = $(this).css('background-image', 'url(' + fichasImg[index] + ')');
    //});
    //crear 
    
    console.log(flipped);
   
    matchTiles();
});

function matchTiles(){
    
    if ($('.flipped').length == 2 ){

        let firstClick = $('.flipped').first().data('par'); //value del data-
        console.log($('.flipped').first().data('par'));
    
        let lastClick = $('.flipped').last().data('par');
        console.log($('.flipped').last().data('par'));

        if(firstClick == lastClick){
            console.log('MATCH! :D '); //OK funciona :D
            //firstClick = null;
            
            //contador++;
                   
            $('.flipped').each(function(){
                $('.flipped').addClass('matched');                
            });

            let matched = $('.matched'); // OK
            console.log(matched); //OK
            //cuando hay match se rompe :(

            firstClick.removeClass('flipped');
            lastClick.removeClass('flipped');

            //dejar las cartas dadas vueltas y unclickable
            //volver a pedir los clicks
            
            //llamar a una funcion victory() que me repita el proceso hasta q matched == 12?
        }else{
            setTimeout(function(){
                $('.flipped').each(function(){
                    $(this).removeClass('flipped');
                });
            },1500); //Esto funciona y se repite
            
            //tendria que volver a llamar a este proceso.
            //que se den vuelta otra vez
    
        }
    } 
    /* ACA FUNCIONA PERO NO ME HACE EL MATCH
    $('.flipped').each(function(){
        $('.flipped').removeClass('flipped');
    });*/
}


shuffle(); // para que arranque con shuffle
matchTiles();

$('#btnStart').on('click',function(){
    shuffle();
    asignarFichas();
    $('.ficha').removeClass('flipped');
    $('.ficha').removeClass('matched');
    $('.ficha').html('');
});