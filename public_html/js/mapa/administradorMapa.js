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

    crearUbicacion();
}

function crearUbicacion() {
    var myCenter = new google.maps.LatLng(-38.7167, -62.2603);
    var marker = new google.maps.Marker({position: myCenter});
    marker.setMap(map);

    var infowindow = new google.maps.InfoWindow({
        content: "Hello World!"
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });

}

