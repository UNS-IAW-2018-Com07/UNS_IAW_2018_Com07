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

    var json =  '[{"compartido": false, "operacion": "Venta", "direccion": "Bartolomé Mitre 891", "precio": 10000000, "fechaConstruccion": "1999-10-20T12:00:00.000Z", "metrosCuadrados": 231, "cantAmbientes": 7, "canBanios": 3, "cantCocheras": 1, "canDormitorios": 4, "descripcion": "Hermosa casa cerca del centro. Buen patio. Ideal para tener un perrito.", "imagenes": ["fileserver/images/Mitre891/im1.png", "fileserver/images/Mitre891/im2.png", "fileserver/images/Mitre891/im3.png"],"propietario": 34236595419}, '+
    '{"piso" : 3 ,"numeroDepto" : "C" ,"compartido" : false ,"operacion" : "Alquiler" ,"direccion" : "Vieytes 223" ,"precio" : 6000 ,"fechaConstruccion" : "2015-11-10T12:00:00.000Z" ,"metrosCuadrados" : 57,"cantAmbientes" : 3 ,"cantBanios" : 1 ,"cantCocheras" : 0 ,"cantDormitorios" : 2 ,"descripcion" : "bla bla esta casa es muy genial bla bla vistas bla bla el mejor precio bla bla" ,"imagenes" : [ "fileserver/images/Vieytes223/3C/im1.png" , "fileserver/images/Vieytes223/3C/im2.png"] ,"propietario" : 34236595419}]';
    
    var viviendas = JSON.parse(json);
    
    var length = Object.keys(viviendas).length;
    for(i=0; i<length; i++){
        var detalle = crearDetalleVivienda(viviendas[i]);
        crearUbicacion(viviendas[i].direccion, detalle);
    }
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
                content: detalle+""
            });

            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(map, marker);
            });
            
        } 
    });
}

function crearDetalleVivienda(vivienda){
    return '<div class="card" style="width: 18rem;">'+
                '<img class="card-img-top" src="..." alt="Card image cap">'+
                    '<div class="card-body">'+
                      '<h5 class="card-title">Card title</h5>'+
                       '<p class="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>'+
                    '<a href="#" class="btn btn-primary">Go somewhere</a>'+
                '</div>'+
           '</div>';
}

