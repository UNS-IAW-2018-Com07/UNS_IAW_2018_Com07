
//Funcion para cargar los datos iniciales de la vivienda seleccionada

$(document).ready(function () {
    $.get("./api/viviendas", function (viviendas) {
        var id_vivienda = obtenerValorParametro("id");
        
        if (id_vivienda) {
            var i = 0;
            var encontre = false;
            var length = viviendas.length;
            while (i < length && !encontre) {
                if (viviendas[i]._id.toString()===(id_vivienda)) {
                    encontre = true;
                } else
                    i++;
            }
            mostrarImagenes(viviendas[i]);
            mostrarTitulo(viviendas[i]);
            actualizarAtributos(viviendas[i]);
            mostrarDescripcion(viviendas[i]);
            mostrarComentarioVivienda(id_vivienda); 
            cargarDatosContacto(viviendas[i].propietario);
        } else {
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

    var div0 = document.createElement("div");
    div0.setAttribute('class', 'item active');

    var img0 = document.createElement("img");
    img0.setAttribute('class', "img-responsive center-block imagen-carousel");
    img0.setAttribute('src', vivienda.imagenes[0]);
    img0.setAttribute('alt', 'Imagen 0 de la vivienda');

    div0.appendChild(img0);
    document.getElementById("grupo-imagenes").appendChild(div0);

    var li0 = document.createElement("li");
    li0.setAttribute('data-target', '#myCarousel');
    li0.setAttribute('data-slide-to', 0);
    li0.setAttribute('class', 'active');

    document.getElementById("grupo-links").appendChild(li0);

    for (var i = 1; i < vivienda.imagenes.length; i++) {
        var div = document.createElement("div");
        div.setAttribute('class', 'item');

        var img = document.createElement("img");
        img.setAttribute('class', "img-responsive center-block imagen-carousel");
        img.setAttribute('src', vivienda.imagenes[i]);
        img.setAttribute('alt', 'Imagen ' + i + ' de la vivienda');

        div.appendChild(img);
        document.getElementById("grupo-imagenes").appendChild(div);


        var li = document.createElement("li");
        li.setAttribute('data-target', '#myCarousel');
        li.setAttribute('data-slide-to', i);

        document.getElementById("grupo-links").appendChild(li);
    }
}
function mostrarTitulo(vivienda) {
    document.getElementById("tituloVivienda").innerHTML = vivienda.operacion + ' - ' + tipoVivienda(vivienda);
    document.getElementById("direccionVivienda").innerHTML = "Dirección: "+direccionCompleta(vivienda);
    document.getElementById("precio").innerHTML = "Precio: $"+vivienda.precio;
}

function actualizarAtributos(vivienda) {
    if(vivienda.compartido)
        document.getElementById("compartido").setAttribute('class','glyphicon glyphicon-ok');
    else
        document.getElementById("compartido").setAttribute('class','glyphicon glyphicon-remove');
    document.getElementById("ambientes").innerHTML = vivienda.cantAmbientes;
    document.getElementById("banios").innerHTML = vivienda.cantBanios;
    document.getElementById("dormitorios").innerHTML = vivienda.cantDormitorios;
    document.getElementById("cocheras").innerHTML = vivienda.cantCocheras;
    document.getElementById("antiguedad").innerHTML = getAntiguedad(vivienda);
    document.getElementById("superficie").innerHTML = vivienda.metrosCuadrados;
}

function mostrarDescripcion(vivienda){
    document.getElementById("contenedorDescripcion").innerHTML = vivienda.descripcion;
}

function cargarDatosContacto(propietario){
    var cuit=propietario.cuit;
        document.getElementById("nombreContacto").innerHTML='Nombre:   '+propietario.nombre;
        document.getElementById("mailContacto").innerHTML='Mail:     '+propietario.correoElectronico;
        document.getElementById("telefonoContacto").innerHTML='Telefono: '+propietario.telefono;
}
