function modificarEstiloLocalStorage(){

    var estilo=document.getElementById("linkEstilo").getAttribute("data-color");

    if (typeof (localStorage) !== "undefined") {;
        localStorage.setItem('estilo',estilo); 
    }

    $.post("/estiloUsuario",{'estilo': estilo}, function(err){});
}

$( window ).on( "load", function(req, res) { 

    $.get("/estiloUsuario", function (estilo) {
        if(estilo==='Rosa' || estilo==='Azul'){
            cambiarEstilo(estilo);
        }
        else{
            if (typeof (localStorage) !== "undefined") {
                if(localStorage.getItem('estilo') !== null){
                    cambiarEstilo(localStorage.getItem('estilo')); 
                }
            }
        } 
        $('body').show();
    });
    
});

