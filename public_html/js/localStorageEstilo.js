
function modificarEstiloLocalStorage(){
    if (typeof (localStorage) !== "undefined") {
        var estilo = document.getElementById("linkEstilo").getAttribute("data-color");
        localStorage.setItem('estilo',estilo); 
    }
}

$( window ).on( "load", function() { 
    if (typeof (localStorage) !== "undefined") {
        if(localStorage.getItem('estilo') !== null){
            cambiarEstilo(localStorage.getItem('estilo')); 
        }
    } 
    $('body').show(); 
});

