function obtenerIdVivienda() {
    var query = document.URL;
    var id = query.split("/"); 
    return id[id.length-1];
}

$( window ).on( "load", function(req, res) { 
    id_vivienda = obtenerIdVivienda(); 
    $.ajax({
        url: "/api/viviendas/"+ id_vivienda +"/comentarios",
        type: 'GET',
        data: {},
        dataType: "json",
        success: function(comentarios){ 
            mostrarComentariosVivienda(comentarios); 
        },
        error: function(xhr,textStatus,err) {
            console.log(err); 
            return null; 
        }, 
    });
}); 

function mostrarComentariosVivienda(comentarios) {
    for (var i = 0; i < comentarios.length; i++) {
        obtenerUsuario(comentarios[i], comentarios[i].idUsuario); 
    }
}

function agregarComentarioVivienda(id_vivienda, id_user) {; 
    if (typeof id_user !== "undefined" && id_user!==null && id_user.length>0) {
        agregarComentarioViviendaAux(id_vivienda, id_user); 
    }
    else {
        mostrarMensajeDeErrorUsuario('Debe loguearse para realizar un comentario.'); 
    }
}

function mostrarMensajeDeErrorUsuario(mensaje){
    var div = document.createElement("div");
    div.setAttribute('class', 'alert alert-danger alert-dismissible');
    div.setAttribute('role', 'alert'); 

    var cerrar = document.createElement("button"); 
    cerrar.setAttribute('type', 'button'); 
    cerrar.setAttribute('class', 'close');
    cerrar.setAttribute('data-dismiss', 'alert');
    cerrar.setAttribute('aria-label', 'Close');

    var span = document.createElement("span"); 
    span.setAttribute('aria-hidden', 'true');
    $(span).html("&times;");

    cerrar.appendChild(span); 

    var strong = document.createElement("strong"); 
    var texto_p1 = document.createTextNode('Oops! ');
    strong.appendChild(texto_p1);

    var texto_p2 = document.createTextNode(mensaje);

    div.appendChild(strong);
    div.appendChild(texto_p2); 
    div.appendChild(cerrar); 

    document.getElementById("barraComentarios").appendChild(div);
}

function agregarComentarioViviendaAux(id_vivienda,id_user){
    var calif = parseInt(obtenerCalificacion());
    var date = new Date();
    var fecha = date.toLocaleDateString() + " " + date.getHours() + ":" + date.getMinutes(); 
    var comentario = document.getElementById('textComentario').value;
    comentario = comentario.replace(/(\n)+/g, '<br>');

    if(comentario.length>0){
        $.ajax({
            url: "/api/viviendas/"+id_vivienda+"/comentarios",
            type: 'POST',
            data: {
                usuario: id_user,
                calificacion: calif,
                fecha: fecha,
                texto: comentario
            },
            dataType: "json",
            success: function(comentario){ 
                obtenerUsuario(comentario,id_user);
            },
            error: function(xhr,textStatus,err) {
                mostrarMensajeDeErrorUsuario('Hubo un problema con la conexion.');  
            },
        });
    }
    else {
        mostrarMensajeDeErrorUsuario('Debe ingresar un comentario.'); 
    }

    resetearObjetos();
}

function obtenerUsuario(comentario, id_user){
     $.ajax({
        url: "/api/usuario/"+id_user,
        type: 'GET',
        data: {},
        dataType: "json",
        qs: { nombre:1, foto:1, id:1 },
        success: function(usuario){ 
            crearComentario(comentario,usuario); 
        },
        error: function(xhr,textStatus,err) {
            console.log(err); 
            return null; 
        }, 
    });
}

function obtenerCalificacion() {
    var calificacion = 0;
    for (var i = 1; i < 11 && calificacion === 0; i++) {
        if (document.getElementById('est' + i).checked) {
            calificacion = i / 2;
        }
    }
    return calificacion;
}

function resetearObjetos() {
    document.getElementById('nombreUsuario').value = "";
    document.getElementById('textComentario').value = "";
    for (var i = 1; i < 11; i++) {
        document.getElementById('est'+i).checked = false;
    }
}

function crearComentario(comentario,user) {
    var li = document.createElement("li");
    li.setAttribute('class', "list-group-item margenSuperior");

    var div_row = document.createElement("div");
    div_row.setAttribute('class', 'media');

    var div_col1 = document.createElement("div");
    div_col1.setAttribute('class', 'media-left media-middle');

    var div_col2 = document.createElement("div");
    div_col2.setAttribute('class', 'media-body word-wrap');

    var div_row1 = document.createElement("div");
    div_row1.setAttribute('class', 'row usuarioComentario');

    var div_row2 = document.createElement("div");
    div_row2.setAttribute('class', 'row');

    var img = document.createElement("img");
    img.setAttribute('class', 'media-object imgComentario text-align-left');
    img.setAttribute('src', user.foto);

    var p1 = document.createElement("p");
    p1.setAttribute('class', 'media-heading text-align-right');
    var texto_p1 = document.createTextNode(comentario.fecha);
    p1.appendChild(texto_p1);

    var divEstrellas = crearBarraEstrellas(parseInt(comentario.calificacion));
    divEstrellas.setAttribute('class', 'media-heading pull-right');

    var pUsuario = document.createElement("p");
    pUsuario.setAttribute('class', 'media-heading pull-left');
    var bold= document.createElement("b");
    var texto_pUsuario = document.createTextNode(user.nombre + ':');
    bold.appendChild(texto_pUsuario); 
    pUsuario.appendChild(bold);

    var p2 = document.createElement("p");
    p2.setAttribute('class', 'text-align-justify col-lg-12');
    p2.innerHTML = ((comentario.texto).replace(/\\n/g, '<br>'));

    div_col1.appendChild(img);

    div_row1.appendChild(p1);
    div_row1.appendChild(divEstrellas);
    div_row1.appendChild(pUsuario);
    div_row2.appendChild(p2);

    div_col2.appendChild(div_row1);
    div_col2.appendChild(div_row2);

    div_row.appendChild(div_col1);
    div_row.appendChild(div_col2);

    li.appendChild(div_row);
    document.getElementById("contenedorComentarios").appendChild(li);
}


