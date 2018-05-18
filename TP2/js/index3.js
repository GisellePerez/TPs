var primerClick= null;

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

var intentos=24;
var aciertos=0;
var pair = [];


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
        
    $('.ficha').each(function(index,elem){

        $(this).attr('data-par',fichas[index].par); //le asigno el data- = al index. Debería cambiar segun el shuffle
       
        let img ='<img class="noVisible" src="'+fichas[index].img+'">';
        var ficha = $("#ficha"+(index+1));
        ficha.append(img);   
    });
}


function matchTiles(){
    
        if($('.visible').length == 2){          
            
            let firstClick = $('.visible').first().attr('src'); //value del data-
            console.log($('.visible').first().attr('src'));
            pair.push('first: '+firstClick);

            let lastClick = $('.visible').last().attr('src');
            console.log($('.visible').last().attr('src'));
            pair.push('last: '+lastClick);
            console.log('pair: '+pair);
            

            if(firstClick==lastClick){

                console.log('MATCH! :D');
                firstClick=null;                 
                lastClick=null;
                pair=[];  

                $('.flipped').each(function(){
                    $('.flipped').children().first().addClass('matched');
                    $('.flipped').children().first().removeClass('visible');
                    $('.flipped').addClass('matched');
                    $('.flipped').removeClass('flipped');                                                                  
                });
                
                
                console.log('Fiiiiiiiiirst: '+firstClick);
                console.log('Laaaaaaaaaast: '+lastClick);
                                           
                aciertos++;
                console.log('aciertos: '+aciertos);     
            }else{  
                console.log('no hay match');
                firstClick=null;                 
                lastClick=null;
                pair=[];
                setTimeout(function(){
                    $('.flipped').each(function(){
                        $(this).removeClass('flipped');
                        $(this).children().first().removeClass('visible');
                        $(this).children().first().addClass('noVisible');
                    });
                    console.log('1ro: '+firstClick);
                    console.log('2do: '+lastClick);
                },1200); 
                intentos--;
                console.log('intentos: '+intentos);            
            }
        }

        gameOver();
        victory();
    }


function gameOver(){
    if(intentos === 0){
        alert('GAME OVER');
    }
}

function victory(){
    if($('.matched') === 12){
        alert('VICTORY!');
    }
}

shuffle();

$('.ficha').on('click', function(){
    
        $(this).children().first().toggleClass('visible noVisible'); //me trae la imagen y no el div y cambia la clase
        //console.log($(this).children().first()); //consolea la img (hija del div)
        
        let dataPar = $(this).attr('data-par');
        console.log(dataPar);
        let currentTile = $(this); 
        let flipped = $(this).addClass('flipped');    
        console.log(flipped);   
   
    matchTiles();
});

