
function agregarComentarioVivienda(){
    if (typeof (localStorage) !== "undefined") {
        var estilo = document.getElementById("linkEstilo").href;
        localStorage.setItem('estilo',estilo); 
    }
}

function mostrarComentarioVivienda(id_vivienda) {
    if (typeof (localStorage) !== "undefined") {
        if(localStorage.getItem(id_vivienda) !== null){
            var comentarios = localStorage.getItem(id_vivienda); 
            for(var i=0; i<comentarios.length; i++){
                crearComentario(comentarios[i]); 
            }
        }
    } 
} 

function crearComentario(comentario){
    var li = document.createElement("li");
    li.setAttribute('class', "list-group-item margenSuperior");
    
    var div_row = document.createElement("div");
    div_row.setAttribute('class', 'media');

    var div = document.createElement("div");
    div.setAttribute('class', 'media-body');

    var h5 = document.createElement("h5");
    h5.setAttribute('class', 'media-heading media-left');
    var texto_h5 = document.createTextNode(comentario.usuario);
    h5.appendChild(texto_h5);

    var divEstrellas = crearBarraEstrellas(comentario.calificacion); 
    divEstrellas.setAttribute('class', 'media-heading media-right');

    var p1 = document.createElement("p");
    var texto_p1 = document.createTextNode('Fecha de publicación: ' + comentario.fechaPublicacion);
    p1.appendChild(texto_p1);

    var p2 = document.createElement("p");
    var texto_p2 = document.createTextNode(comentario.texto);
    p2.appendChild(texto_p2);

    div.appendChild(h5);
    div.appendChild(divEstrellas);
    div.appendChild(p1);
    div.appendChild(p2);

    div_row.appendChild(div);

    li.appendChild(div_row);
    document.getElementById("contenedorComentarios").appendChild(li);
}


