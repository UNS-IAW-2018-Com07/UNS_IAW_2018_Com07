function cargarDatos() {
    var id_vivienda = obtenerValorParametro("id");

    if (!(id_vivienda === false)) {
        var vivienda = obtenerVivienda(id_vivienda);
        mostrarImagenes(vivienda);

    } else {
        //hubo un error, habria que hacer algo
    }

}

function obtenerValorParametro(parametro) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var par = vars[i].split("=");
        if (par[0] === parametro) {
            return par[1];
        }
    }
    return false;
}

function mostrarImagenes(vivienda) {
    document.getElementById("primerImagen").src=(vivienda.imagenes[0]);
}