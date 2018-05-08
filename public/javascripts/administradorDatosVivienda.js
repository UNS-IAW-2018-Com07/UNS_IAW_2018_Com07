function crearDetalleVivienda(vivienda) {
    return '<div class="media" style="width: 35rem;">' +
                '<div class="media-left media-middle">' +
                    '<img class="media-object" src=public/'+vivienda.imagenes[0]+' alt="Imagen inmueble" width="180px" ></div>' +
                '<div id="marcadorMapa" class="media-body">' +
                    '<h5 class="media-heading">Precio: $'+vivienda.precio+'</h5>' +
                    '<h6 class="media-heading">'+vivienda.operacion+' - '+vivienda.tipoVivienda+'</h6>' +
                    crearBarraEstrellas(vivienda.calificacion).outerHTML + 
                    '<p class="card-text">Direccion: '+ vivienda.direccion +'</p>' +
                    '<a href="/viviendas/' + vivienda._id.toString() + '" class="btn btnOscuro margenSuperior pull-right">Ver más</a>' +
                '</div>' +
            '</div>';
}

function crearBarraEstrellas(cantEstrellas){
    var estrellas = document.createElement("div");
    var star1 = document.createElement("span");
    var star2 = document.createElement("span");
    var star3 = document.createElement("span");
    var star4 = document.createElement("span");
    var star5 = document.createElement("span");
    star5.setAttribute('class', 'fa fa-star nonCheckedStar');
    star4.setAttribute('class', 'fa fa-star nonCheckedStar');
    star3.setAttribute('class', 'fa fa-star nonCheckedStar');
    star2.setAttribute('class', 'fa fa-star nonCheckedStar');
    star1.setAttribute('class', 'fa fa-star nonCheckedStar');
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