var seleccionada;

function obtenerVivienda(id_vivienda) {
    $.get("datos/viviendas.json", function (viviendas) {
        var i=0;
        var encontre=false;
        var length = viviendas.length;
        while (i < length && !encontre) {
            if (viviendas[i].id === id_vivienda){
                console.log(viviendas[i]);
                seleccionada=viviendas[i];
                encontre=true;
            }
            else
                i++;
        }
    });
}

function tipoVivienda(vivienda) {
    var tipo;
    if (vivienda.hasOwnProperty("piso")) {
        tipo = "Departamento";
    } else {
        tipo = "Casa";
    }
    if (vivienda.compartida) {
        tipo = tipo + " compartido";
    }
    return tipo;
}

function crearDetalleVivienda(vivienda) {
    return '<div class="media" style="width: 18rem;">' +
            '<img class="media-left img-fluid" src=' + vivienda.imagenes[0] + ' alt="Imagen inmueble" width="200">' +
            '<div class="media-body mediaContainer">' +
            '<h5 class="card-title">Precio: $' + vivienda.precio + '</h5>' +
            '<h6 class="card-title">' + vivienda.operacion + ' - ' + tipoVivienda(vivienda) + '</h6>' +
            '<p class="card-text">Direccion: ' + vivienda.direccion + '.</p>' +
            '<a href="detalleVivienda.html?id=' + vivienda.id + '" class="btn btnOscuro">Ver más</a>' +
            '</div>' +
            '</div>';
}

function insertarListaVivienda(vivienda) {
    var li = document.createElement("li");
    li.setAttribute('class', "list-group-item margenSuperior");

    var div_row = document.createElement("div");
    div_row.setAttribute('class', 'media');

    var div_col1 = document.createElement("div");
    div_col1.setAttribute('class', 'media-left');

    var div_col2 = document.createElement("div");
    div_col2.setAttribute('class', 'media-body');

    var img = document.createElement("img");
    img.setAttribute('class', 'media-left media-middle img-fluid');
    img.setAttribute('src', vivienda.imagenes[0]);
    img.setAttribute('alt', 'Imagen inmueble');
    img.setAttribute('width', "200px");

    var h5 = document.createElement("h5");
    h5.setAttribute('class', 'card-title');
    var texto_h5 = document.createTextNode('Precio: $' + vivienda.precio);
    h5.appendChild(texto_h5);

    var h6 = document.createElement("h6");
    h6.setAttribute('class', 'card-title');
    var texto_h6 = document.createTextNode(vivienda.operacion + ' - ' + tipoVivienda(vivienda));
    h6.appendChild(texto_h6);

    var p = document.createElement("p");
    p.setAttribute('class', 'card-text');
    var texto_p = document.createTextNode('Direccion: ' + vivienda.direccion);
    p.appendChild(texto_p);

    var a = document.createElement("a");
    a.setAttribute('class', 'btn btnOscuro');
    a.setAttribute('href', 'detalleVivienda.html?id=' + vivienda.id);
    // a.setAttribute('data-id-vivienda',vivienda.id);
    var texto_a = document.createTextNode('Ver más');
    a.appendChild(texto_a);

    div_col1.appendChild(img);

    div_col2.appendChild(h5);
    div_col2.appendChild(h6);
    div_col2.appendChild(p);
    div_col2.appendChild(a);

    div_row.appendChild(div_col1);
    div_row.appendChild(div_col2);

    li.appendChild(div_row);
    document.getElementById("contenedorListado").appendChild(li);
}
