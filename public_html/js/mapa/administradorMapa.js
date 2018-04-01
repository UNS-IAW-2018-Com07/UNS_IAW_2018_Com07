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

    crearUbicacion("Vieytes 656");
}

function crearUbicacion(direccion) {
    var ciudad = ", Bahia Blanca, Argentina";

    geocoder.geocode({'address': direccion.concat(ciudad)}, function (results, status) {
        if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
            
            var infowindow = new google.maps.InfoWindow({
                content: "info de la vivienda"
            });

            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(map, marker);
            });
            
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });

 
}

