var listado_creado = false;

function mostrarListado() {
    document.getElementById("botonListado").disabled = true;
    document.getElementById("botonMapa").disabled = false;

    document.getElementById("mapa").style.display = "none";
    document.getElementById("barraListado").style.display = "block";
    document.getElementById("barraOrdenar").style.display = "block";
    
    document.getElementById("barraMenu").setAttribute('class','container-fluid barraMenu barraMenuListado'); 

    if (listado_creado === false){
        $.get("datos/viviendas.json", function (viviendas) {
            var length = viviendas.length;
            for (i = 0; i < length; i++) {
                insertarListaVivienda(viviendas[i]);
            }
        });
        listado_creado=true;
    }
}

function ocultarListado() {
    document.getElementById("botonMapa").disabled = true;
    document.getElementById("botonListado").disabled = false;

    document.getElementById("barraListado").style.display = "none";
    document.getElementById("barraOrdenar").style.display = "none";
    document.getElementById("mapa").style.display = "block";
    document.getElementById("barraMenu").setAttribute('class','container-fluid barraMenu barraMenuMapa'); 
}

