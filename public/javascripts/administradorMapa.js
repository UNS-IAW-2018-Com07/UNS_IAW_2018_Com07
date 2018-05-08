/* global google */
/* global map */
/* global markers */
/* global lastOpenedInfowindow */

var markers= {};
var lastOpenedInfowindow;

const ciudad = ", Bahia Blanca, Buenos Aires, Argentina";

function myMap() {

    var mapOptions = {
        center: new google.maps.LatLng(-38.7167, -62.2603),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    //Crea un nuevo mapa dentro del elemento con identificacion "mapa" usando 
    //los parametros dados en mapOptions. 
    map = new google.maps.Map(document.getElementById("mapa"), mapOptions);
    lastOpenedInfowindow=new google.maps.InfoWindow({map: map});

    geocoder = new google.maps.Geocoder();

    $.get("./api/viviendas", function (viviendas) {
        var length = viviendas.length;
        for (i = 0; i < length; i++) {
            crearUbicacion(viviendas[i]);
        }
    });
}

function crearUbicacion(vivienda) {

    geocoder.geocode({'address': (vivienda.direccion).concat(ciudad)}, function (results, status) {

        if (status === 'OK') {
            markers[vivienda._id] = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });

            google.maps.event.addListener(markers[vivienda._id], 'click', function () {
                crearInfowindow(results[0].geometry.location,vivienda,markers[vivienda._id]);
            });

        }
    });
}

function crearInfowindow(pos,vivienda,marker){
    lastOpenedInfowindow.close();
    lastOpenedInfowindow.setContent(crearDetalleVivienda(vivienda));   
    lastOpenedInfowindow.open(map,marker);
}