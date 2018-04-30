function agregarComentarioVivienda() {
    if (typeof (localStorage) !== "undefined") {
        var usuario = document.getElementById('nombreUsuario').value;
        var calificacion = obtenerCalificacion();
        var fecha = (new Date()).toDateString();
        var vivienda = obtenerValorParametro("id");
        var comentario = document.getElementById('textComentario').value;
        comentario = comentario.replace(/(\n)+/g, '\\n');

        var objeto = '{'
                + '"usuario" : "' + usuario + '", '
                + '"calificacion" : ' + calificacion + ', '
                + '"fecha" : "' + fecha + '", '
                + '"texto" : "' + comentario + '"}';

        var resultado = localStorage.getItem(vivienda);
        var array = null;
        if (resultado !== undefined) {
            array = new Set(JSON.parse(resultado));
            array.add(objeto);
        } else {
            array = new Set();
        }

        localStorage.setItem(vivienda, JSON.stringify(Array.from(array.values())));
        crearComentario(JSON.parse(objeto));
    }
    resetearObjetos();
}

function obtenerCalificacion() {
    var calificacion = 0;
    for (var i = 1; i < 11 && calificacion === 0; i++) {
        if (document.getElementById('est' + i).checked) {
            calificacion = i / 2;
        }
    }
    console.log(calificacion);
    return calificacion;
}

function resetearObjetos() {
    document.getElementById('nombreUsuario').value = "";
    document.getElementById('textComentario').value = "";
    for (var i = 1; i < 11; i++) {
        document.getElementById('est'+i).checked = false;
    }
}

function mostrarComentarioVivienda(id_vivienda) {
    if (typeof (localStorage) !== "undefined") {
        if (localStorage.getItem(id_vivienda) !== null) {
            var comentarios = JSON.parse(localStorage.getItem(id_vivienda));
            for (var i = 0; i < comentarios.length; i++) {
                crearComentario(JSON.parse(comentarios[i]));
            }
        }
    }
}

function crearComentario(comentario) {
    var li = document.createElement("li");
    li.setAttribute('class', "list-group-item margenSuperior listadoComentario");

    var div_row = document.createElement("div");
    div_row.setAttribute('class', 'media');

    var div_col1 = document.createElement("div");
    div_col1.setAttribute('class', 'media-left');

    var div_col2 = document.createElement("div");
    div_col2.setAttribute('class', 'media-body word-wrap');

    var div_row1 = document.createElement("div");
    div_row1.setAttribute('class', 'row usuarioComentario');

    var div_row2 = document.createElement("div");
    div_row2.setAttribute('class', 'row');

    var img = document.createElement("img");
    img.setAttribute('class', 'media-object imgComentario text-align-left');
    img.setAttribute('src', 'images/imgComentario.png');

    var p1 = document.createElement("p");
    p1.setAttribute('class', 'media-heading text-align-right');
    var texto_p1 = document.createTextNode(comentario.fecha);
    p1.appendChild(texto_p1);

    var divEstrellas = crearBarraEstrellas(parseInt(comentario.calificacion));
    divEstrellas.setAttribute('class', 'media-heading pull-right');

    var h5 = document.createElement("h5");
    h5.setAttribute('class', 'media-heading pull-left');
    var texto_h5 = document.createTextNode(comentario.usuario + ':');
    h5.appendChild(texto_h5);

    var p2 = document.createElement("p");
    p2.setAttribute('class', 'text-align-justify col-lg-12');
    p2.innerHTML = ((comentario.texto).replace(/\n/g, '<br>'));

    div_col1.appendChild(img);

    div_row1.appendChild(p1);
    div_row1.appendChild(divEstrellas);
    div_row1.appendChild(h5);
    div_row2.appendChild(p2);

    div_col2.appendChild(div_row1);
    div_col2.appendChild(div_row2);

    div_row.appendChild(div_col1);
    div_row.appendChild(div_col2);

    li.appendChild(div_row);
    document.getElementById("contenedorComentarios").appendChild(li);
}


