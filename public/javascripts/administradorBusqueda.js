function busquedaPorPalabra() {
	var palabra = document.getElementById('form-control-busqueda').value;
	document.getElementById('form-control-busqueda').value = ""; 
	if(palabra){

		ocultar(); 

		palabra=palabra.toLowerCase();

		$.get("./api/busqueda", function (viviendas) {
			viviendas.forEach(function(vivienda) {
				if((vivienda.direccion).toLowerCase().includes(palabra)
				||(vivienda.descripcion).toLowerCase().includes(palabra)){
					if(document.getElementById(vivienda._id))
						//es porque puede que se actualice la base de datos pero como el listado se creo antes
						//no existe un li con esa id
						document.getElementById(vivienda._id).style.display = "block";
					//else podria agregarse un nuevo li pero eso requiere otra consulta a la db
					if(markers[vivienda._id])
						markers[vivienda._id].setMap(map);
				}
			}); 
		});
	}	
}

function ocultar(){
	//Ocultar los markers y los li, tambien la ultima infowindow abierta
	$("#contenedorListado").children().css({"display": "none"});
	
	lastOpenedInfowindow.close();
	
	for(var id in markers){
		markers[id].setMap(null);
	}
}

function buscar(){

	//Crear el filtro correspondiente que se pasara a mongo para que busque
	var filtro={};
	setFiltroCompartido(filtro);
	setFiltroTipoVivienda(filtro);
	setFiltroOperacion(filtro);
	setFiltroAmbientes(filtro);
	setFiltroDormitorios(filtro);
	setFiltroBanios(filtro);
	setFiltroCocheras(filtro);
	setFiltroPrecio(filtro); 

	ocultar(); 

    //Obtener las viviendas seleccionadas y mostrar los markers y li correspondientes
	$.get("./api/viviendasSoloId",filtro, function (viviendas) {
       	viviendas.forEach(function(vivienda) {
			if(document.getElementById(vivienda._id))
				//es porque puede que se actualice la base de datos pero como el listado se creo antes
				//no existe un li con esa id
				document.getElementById(vivienda._id).style.display = "block";
			//else podria agregarse un nuevo li pero eso requiere otra consulta a la db
			if(markers[vivienda._id])
				markers[vivienda._id].setMap(map);
		});  
    });
}

function setFiltroCompartido(filtro){

	filtro.compartido=document.getElementById("viviendaCompartida").checked;
}

function setFiltroTipoVivienda(filtro){

	if (document.getElementById("Departamento").checked === true && document.getElementById("Casa").checked === false)
	 	filtro.tipoVivienda="Departamento";
	else
	 	if (document.getElementById("Casa").checked === true && document.getElementById("Departamento").checked === false)
	 		filtro.tipoVivienda="Casa";  
	//Si presiona los dos o ninguno, es lo mismo, busca tanto casa como departamentos
}

function setFiltroOperacion(filtro){

	if (document.getElementById("Alquiler").checked === true && document.getElementById("Compra").checked === false)
	 	filtro.operacion="Alquiler";
	else 
	 	if (document.getElementById("Compra").checked === true && document.getElementById("Alquiler").checked === false)
	 		filtro.operacion="Venta";
	//Si presiona los dos o ninguno, es lo mismo, busca tanto alquiler como compra

}

function setFiltroAmbientes(filtro){
	var aux=$('#ambienteCheckboxes').val();

	if(aux!==null){

		if(aux[aux.length-1]==="+5"){ //se selecciono la opcion +5
			delete aux[aux.length-1];
			if(aux.length>0){ //se seleccionó otra opción además de +5
				filtro.$or=[];
				filtro.$or[0]={cantAmbientes: {$gt: 5}};
				filtro.$or[1]={cantAmbientes: aux};
			}
			else{//solo se selecciono +5
				filtro.cantAmbientes= {$gt: 5};
			}
		}
		else{
			filtro.cantAmbientes=aux;
		}
	}
}//En esta funcion no me fijo si existe otro $or porque es la primera

function setFiltroDormitorios(filtro){
	var aux=$('#dormitoriosCheckboxes').val();

	if(aux!==null){
		if(aux[aux.length-1]==="+5"){ //se selecciono la opcion +5
			delete aux[aux.length-1];
			if(aux.length>0){ //se seleccionó otra opción además de +5
				if(filtro.$or){//ya existe un $or, tengo que crear un $and
					filtro.$and=[];
					filtro.$and[0]={$or: filtro.$or};
					delete filtro.$or;
					filtro.$and[1]={$or: [{cantDormitorios: {$gt: 5}},{cantDormitorios: aux}]};
				}	
				else{
					filtro.$or=[];		
					filtro.$or[0]={cantDormitorios: {$gt: 5}};
					filtro.$or[1]={cantDormitorios: aux};	
				}
		    }
			else//solo se selecciono +5
				filtro.cantDormitorios= {$gt: 5};
		}
		else //no se selecciono +5
			filtro.cantDormitorios=aux;
	}
}

function setFiltroBanios(filtro){
	var aux=$('#banosCheckboxes').val();

	if(aux!==null){

		if(aux[aux.length-1]==="+3"){ //se selecciono la opcion +3
			delete aux[aux.length-1];
			if(aux.length>0){ //se seleccionó otra opción además de +3
				if(filtro.$or){ //si existe $or no hay $and
					filtro.$and=[];
					filtro.$and[0]={$or: filtro.$or};
					delete filtro.$or;
					filtro.$and[1]={$or: [{cantBanios: {$gt: 3}},{cantBanios: aux}]};
				}	
				else{
					if(filtro.$and)//ya esta el $and creado, necesito insertar el $or adentro. Solo puede haber dos &or dentro del $and
						filtro.$and[3]={$or: [{cantBanios: {$gt: 3}},{cantBanios: aux}]};
					else{ //no hay $or creado
						filtro.$or=[];		
						filtro.$or[0]={cantBanios: {$gt: 3}};
						filtro.$or[1]={cantBanios: aux};	
					}
				}
			}
			else//solo se selecciono +3
				filtro.cantBanios= {$gt: 3};
		}
		else//no se selecciono +3
			filtro.cantBanios=aux;
	}
}

function setFiltroCocheras(filtro){
	var aux=$('#cocherasCheckboxes').val();

	if(aux!==null){

		if(aux[aux.length-1]==="+2"){ //se selecciono la opcion +2
			delete aux[aux.length-1];
			if(aux.length>0){ //se seleccionó otra opción además de +2
				if(filtro.$or){ //si existe $or no hay $and
					filtro.$and=[];
					filtro.$and[0]={$or: filtro.$or};
					delete filtro.$or;
					filtro.$and[1]={$or: [{cantCocheras: {$gt: 2}},{cantCocheras: aux}]};
				}	
				else{
					if(filtro.$and)//ya esta el $and creado, necesito insertar el $or adentro. 
						filtro.$and[filtro.$and.length]={$or: [{cantCocheras: {$gt: 2}},{cantCocheras: aux}]};
					else{ //no hay $or creado
						filtro.$or=[];		
						filtro.$or[0]={cantCocheras: {$gt: 2}};
						filtro.$or[1]={cantCocheras: aux};	
					}
				}
			}
			else//solo se selecciono +2
				filtro.cantCocheras= {$gt: 2};
		}
		else//no se selecciono +2
			filtro.cantCocheras=aux;
	}
}

function setFiltroPrecio(filtro){

 	filtro.precio={$lte: document.getElementById("miRango").value};

}
