
//Funcion para cargar los datos iniciales de la vivienda seleccionada

$(document).ready(function () {
    $.get("datos/viviendas.json", function (viviendas) {
        var id_vivienda = obtenerValorParametro("id");
        if (id_vivienda) {
            var i = 0;
            var encontre = false;
            var length = viviendas.length;
            while (i < length && !encontre) {
                if (parseInt(viviendas[i].id) === parseInt(id_vivienda)) {
                    mostrarImagenes(viviendas[i]);
                    mostrarComentarioVivienda(viviendas[i]); 
                    encontre = true;
                } else
                    i++;
            }
        }
        else {
            alert("No se encontró la vivienda seleccionada."); 
        }
    });
});

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
    var grupoImg = document.getElementById("grupo-imagenes"); 
    
    for(var i=0; i<vivienda.imagenes.length; i++){
        var div = document.createElement("div");
        div.setAttribute('class','item active'); 
        
        var img = document.createElement("img"); 
        img.setAttribute('id',i); 
        img.setAttribute('src',vivienda.imagenes[i]); 
        
        div.appendChild(img); 
        grupoImg.appendChild(div); 
        //document.getElementById("primerImagen").src = (vivienda.imagenes[i]);
    } 
}