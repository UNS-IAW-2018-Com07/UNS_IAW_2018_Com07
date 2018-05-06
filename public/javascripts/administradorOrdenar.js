function ordenarMayorPrecio(){
    ordenar({precio:-1});
}

function ordenarMenorPrecio(){
     ordenar({precio:1});
}

function ordenar(filtro){

	$.get("./api/sort",filtro, function (viviendas) {
		var int=0;

       	viviendas.forEach(function(vivienda) {
       		if(document.getElementById(vivienda._id)) {
       			//es porque puede que se actualice la base de datos pero como el listado se creo antes
       			//no existe un li con esa id
  				document.getElementById(vivienda._id).style.order=i;
  				i++;
  			}
  			//else podria agregarse un nuevo li pero eso requiere otra consulta a la db
		  });

  });

}