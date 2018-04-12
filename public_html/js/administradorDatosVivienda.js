function getAntiguedad(vivienda){
    var fecha = new Date();
    var anio = fecha.getFullYear();
    return anio - vivienda.anioConstruccion;
}

function tipoVivienda(vivienda) {
    var tipo;
    if (vivienda.hasOwnProperty("piso")) {
        tipo = "Departamento";
    } else {
        tipo = "Casa";
    }
    if (vivienda.compartido) {
        tipo = tipo+" compartido";
    }
    return tipo;
}

function direccionCompleta(vivienda){
    var direccion = vivienda.direccion;
    if(vivienda.hasOwnProperty("piso")){
        direccion= direccion + " - " + vivienda.piso;
        if(vivienda.hasOwnProperty("numeroDepto"))
        direccion= direccion + vivienda.numeroDepto;
    }
    
    return direccion;
}

function crearDetalleVivienda(vivienda) {
    return '<div class="media" style="width: 35rem;">' +
                '<div class="media-left media-middle">' +
                    '<img class="media-object" src='+vivienda.imagenes[0]+' alt="Imagen inmueble" width="180px" ></div>' +
                '<div id="marcadorMapa" class="media-body">' +
                    '<h5 class="media-heading">Precio: $'+vivienda.precio+'</h5>' +
                    '<h6 class="media-heading">'+vivienda.operacion+' - '+tipoVivienda(vivienda)+'</h6>' +
                    crearBarraEstrellas(calcularEstrellasVivienda(vivienda)).outerHTML + 
                    '<p class="card-text">Direccion: '+ vivienda.direccion +'.</p>' +
                    '<a href="detalleVivienda.html?id=' + vivienda.id + '" class="btn btnOscuro margenSuperior pull-right">Ver más</a>' +
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
    var texto_p = document.createTextNode('Direccion: ' + direccionCompleta(vivienda));
    p.appendChild(texto_p);

    var a = document.createElement("a");
    a.setAttribute('class', 'btn btnOscuro');
    a.setAttribute('href', 'detalleVivienda.html?id=' + vivienda.id);
    var texto_a = document.createTextNode('Ver más');
    a.appendChild(texto_a);
        
    div_col1.appendChild(img);

    div_col2.appendChild(h5);
    div_col2.appendChild(h6);
    div_col2.appendChild(crearBarraEstrellas(calcularEstrellasVivienda(vivienda)));
    div_col2.appendChild(p);
    div_col2.appendChild(a);

    div_row.appendChild(div_col1);
    div_row.appendChild(div_col2);

    li.appendChild(div_row);
    document.getElementById("contenedorListado").appendChild(li);
}

function crearBarraEstrellas(cantEstrellas){
    var estrellas = document.createElement("div");
    var star1 = document.createElement("span");
    var star2 = document.createElement("span");
    var star3 = document.createElement("span");
    var star4 = document.createElement("span");
    var star5 = document.createElement("span");
    star5.setAttribute('class', 'fa fa-star');
    star4.setAttribute('class', 'fa fa-star');
    star3.setAttribute('class', 'fa fa-star');
    star2.setAttribute('class', 'fa fa-star');
    star1.setAttribute('class', 'fa fa-star');
    switch (cantEstrellas) {
        case 5:
            star5.setAttribute('class', 'fa fa-star checkedStar');
        case 4:
            star4.setAttribute('class', 'fa fa-star checkedStar');
        case 3:
            star3.setAttribute('class', 'fa fa-star checkedStar');
        case 2:
            star2.setAttribute('class', 'fa fa-star checkedStar');
        case 1:
            star1.setAttribute('class', 'fa fa-star checkedStar');
    }
    estrellas.appendChild(star1);
    estrellas.appendChild(star2);
    estrellas.appendChild(star3);
    estrellas.appendChild(star4);
    estrellas.appendChild(star5);
    
    return estrellas; 
}

function calcularEstrellasVivienda(vivienda){
    return 3; 
}