function actualizarPreciosRango() {
    var filtro={};

    if (document.getElementById("Alquiler").checked === true && document.getElementById("Compra").checked === false)
        filtro.operacion="Alquiler";
    else 
        if (document.getElementById("Compra").checked === true && document.getElementById("Alquiler").checked === false)
            filtro.operacion="Venta";
    //Si presiona los dos o ninguno, es lo mismo, busca dentro de todos los precios

    $.get("./api/rango", filtro, function (precios) { 
        auxActualizarPreciosRango(precios.minimo, precios.maximo);
    }); 
}

function actualizarPreciosRangoPrimeraVez() {

    $.get("./api/rango", function (precios) { 
        auxActualizarPreciosRangoPrimeraVez(precios.minimo, precios.maximo);
    }); 
}

function auxActualizarPreciosRango(minimo,maximo){
    //Si seleccione algo menor al nuevo maximo, lo dejo seleccionado donde estaba
    actualizarRango(minimo,maximo);
    if(document.getElementById("miRango").value>maximo){
        document.getElementById("miRango").value = maximo;
        document.getElementById("idTxt").innerHTML = maximo;
    }
}

function auxActualizarPreciosRangoPrimeraVez(minimo,maximo){
    actualizarRango(minimo,maximo);
    document.getElementById("miRango").value = maximo;
    document.getElementById("idTxt").innerHTML = maximo;
}

function actualizarRango(minimo, maximo) {
        document.getElementById("miRango").min = minimo;
        document.getElementById("miRango").max = maximo;
        document.getElementById("minimo").innerHTML = minimo;
        document.getElementById("maximo").innerHTML = maximo;     
}

$( window ).on( "load", function() {
    document.getElementById("contenedorRango").style.display="block"; 
    actualizarPreciosRangoPrimeraVez(); 
});
