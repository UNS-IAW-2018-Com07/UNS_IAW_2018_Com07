/* global google */
/* global map */

function myMap() {
    var mapOptions = {
        center: new google.maps.LatLng(-38.7167, -62.2603),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    //Crea un nuevo mapa dentro del elemento con identificacion "mapa" usando 
    //los parametros dados en mapOptions. 
    map = new google.maps.Map(document.getElementById("mapa"), mapOptions);

    geocoder = new google.maps.Geocoder();

    $.get("datos/viviendas.json", function (viviendas) {
        var length = viviendas.length;
        for (i = 0; i < length; i++) {
            var detalle = crearDetalleVivienda(viviendas[i]);
            crearUbicacion(viviendas[i].direccion, detalle);
        }
    });
}

function crearUbicacion(direccion, detalle) {
    var ciudad = ", Bahia Blanca, Buenos Aires, Argentina";

    geocoder.geocode({'address': direccion.concat(ciudad)}, function (results, status) {
        if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });

            var infowindow = new google.maps.InfoWindow({
                content: detalle + ""
            });

            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(map, marker);
            });

        }
    });
}

function crearDetalleVivienda(vivienda) {
    return '<div class="card" style="width: 18rem;">' +
            '<img class="card-img-top" src="..." alt="Card image cap">' +
            '<div class="card-body">' +
            '<h5 class="card-title">Card title</h5>' +
            '<p class="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>' +
            '<a href="#" class="btn btn-primary">Go somewhere</a>' +
            '</div>' +
            '</div>';
}

