function actualizarPreciosRango() {
    var filtro={};

    if (document.getElementById("Alquiler").checked === true && document.getElementById("Compra").checked === false)
        filtro.operacion="Alquiler";
    else 
        if (document.getElementById("Compra").checked === true && document.getElementById("Alquiler").checked === false)
            filtro.operacion="Venta";
    //Si presiona los dos o ninguno, es lo mismo, busca dentro de todos los precios

    $.get("/api/rango", filtro, function (precios) { 
        auxActualizarPreciosRango(precios.minimo, precios.maximo);
    }); 
}

function auxActualizarPreciosRango(minimo,maximo){
    document.getElementById("miRango").min = minimo;
    document.getElementById("miRango").max = maximo;
    document.getElementById("miRango").value = maximo;

    document.getElementById("minimo").innerHTML = minimo;
    document.getElementById("maximo").innerHTML = maximo;
    document.getElementById("idTxt").innerHTML = maximo;
  
}


$( window ).on( "load", function() {
    document.getElementById("contenedorRango").style.display="block"; 
    actualizarPreciosRango(); 
});
