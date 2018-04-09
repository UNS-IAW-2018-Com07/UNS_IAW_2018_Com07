function agregarComentarioVivienda() {
    if (typeof (localStorage) !== "undefined") {
        var usuario = document.getElementById('nombreUsuario').value;
        var calificacion = obtenerCalificacion();
        var fecha = (new Date()).toDateString();
        var vivienda = obtenerValorParametro("id");
        var comentario = document.getElementById('textComentario').value;

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
    if (document.getElementById('estrella5').checked) {
        calificacion = 5;
    } else {
        if (document.getElementById('estrella4media').checked) {
            calificacion = 4.5;
        } else {
            if (document.getElementById('estrella4').checked) {
                calificacion = 4;
            } else {
                if (document.getElementById('estrella3media').checked) {
                    calificacion = 3.5;
                } else {
                    if (document.getElementById('estrella3').checked) {
                        calificacion = 3;
                    } else {
                        if (document.getElementById('estrella2media').checked) {
                            calificacion = 2.5;
                        } else {
                            if (document.getElementById('estrella2').checked) {
                                calificacion = 2;
                            } else {
                                if (document.getElementById('estrella1media').checked) {
                                    calificacion = 1.5;
                                } else {
                                    if (document.getElementById('estrella1').checked) {
                                        calificacion = 1;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    return calificacion;
}

function resetearObjetos() {
    document.getElementById('nombreUsuario').value = "";
    document.getElementById('textComentario').value = "";
    document.getElementById('estrella5').checked = false;
    document.getElementById('estrella4media').checked = false;
    document.getElementById('estrella4').checked = false;
    document.getElementById('estrella3media').checked = false;
    document.getElementById('estrella3').checked = false;
    document.getElementById('estrella2media').checked = false;
    document.getElementById('estrella2').checked = false;
    document.getElementById('estrella1media').checked = false;
    document.getElementById('estrella1').checked = false;
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
    li.setAttribute('class', "list-group-item margenSuperior");

    var div_row = document.createElement("div");
    div_row.setAttribute('class', 'media');

    var div_col1 = document.createElement("div");
    div_col1.setAttribute('class', 'media-left media-middle');

    var div_col2 = document.createElement("div");
    div_col2.setAttribute('class', 'media-body');

    var h5 = document.createElement("h5");
    h5.setAttribute('class', 'media-heading media-left');
    var texto_h5 = document.createTextNode(comentario.usuario);
    h5.appendChild(texto_h5);

    var p1 = document.createElement("p");
    p1.setAttribute('class', 'media-heading text-align-right');
    var texto_p1 = document.createTextNode('Fecha de publicación: ' + comentario.fecha);
    p1.appendChild(texto_p1);
    
    var divEstrellas = crearBarraEstrellas(parseInt(comentario.calificacion));
    divEstrellas.setAttribute('class', 'media-heading text-align-right');

    var p2 = document.createElement("p");
    var texto_p2 = document.createTextNode(comentario.texto);
    p2.appendChild(texto_p2);

    div_col1.appendChild(h5);

     div_col2.appendChild(p1);
    div_col2.appendChild(divEstrellas);
    div_col2.appendChild(p2);

    div_row.appendChild(div_col1);
    div_row.appendChild(div_col2);

    li.appendChild(div_row);
    document.getElementById("contenedorComentarios").appendChild(li);
}


