function modificarEstiloLocalStorage(){

    var estilo=document.getElementById("linkEstilo").getAttribute("data-color");

    if (typeof (localStorage) !== "undefined") {
        localStorage.setItem('estilo',estilo); 
    }

    $.post("/api/usuario",{'estilo': estilo}, function(err){
      
    });
}

$( window ).on( "load", function(req, res) { 

    $.ajax({
        url: "/api/usuario/",
        type: 'GET',
        data: {},
        dataType: "json",
        success: function(estilo){ 
            cambiarEstilo(estilo.estilo); 
        },
        error: function(xhr,textStatus,err) {
            if (typeof (localStorage) !== "undefined") {
                if(localStorage.getItem('estilo') !== null){
                    cambiarEstilo(localStorage.getItem('estilo')); 
                }
            }
        }, 
    });

    $('body').show();
    
});

