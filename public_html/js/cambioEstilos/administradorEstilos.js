function cambiarEstilo(value){
    document.getElementById("linkEstilo").href=value;
}

function myMap() {
    var mapOptions = {
        center: new google.maps.LatLng(-38.7167, -62.2603),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
   
    //Crea un nuevo mapa dentro del elemento con identificacion "mapa" usando 
    //los parametros dados en mapOptions. 
    var map = new google.maps.Map(document.getElementById("mapa"), mapOptions);
}