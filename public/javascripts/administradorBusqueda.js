var indiceFiltroOr=0;

function buscar(){

//{$or: [ {cantAmbientes: {$gt: 5}}, {cantAmbientes: [5]} ]};

	var filtro={};

	setFiltroCompartido(filtro);
	setFiltroTipoVivienda(filtro);
	setFiltroOperacion(filtro);
	setFiltroAmbientes(filtro);
	setFiltroDormitorios(filtro);
	setFiltroBanios(filtro);
	setFiltroCocheras(filtro);
	setFiltroPrecio(filtro);

	$.get("./api/filtrado",filtro, function (viviendas) {
         console.log(viviendas);   
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
	 	filtro.peracion="Alquiler";
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
				if(indiceFiltroOr==0)
					filtro.$or=[];
				filtro.$or[indiceFiltroOr]={cantAmbientes: {$gt: 5}};
				filtro.$or[indiceFiltroOr+1]={cantAmbientes: aux};
				indiceFiltroOr=indiceFiltroOr+2;
			}
			else{//solo se selecciono +5
				filtro.cantAmbientes= {$gt: 5};
			}
		}
		else{
			filtro.cantAmbientes=aux;
		}
	}
}

function setFiltroDormitorios(filtro){
	var aux=$('#dormitoriosCheckboxes').val();

	if(aux!==null){

		if(aux[aux.length-1]==="+5"){ //se selecciono la opcion +5
			delete aux[aux.length-1];
			if(aux.length>0){ //se seleccionó otra opción además de +5
				if(indiceFiltroOr==0)
					filtro.$or=[];
				filtro.$or[indiceFiltroOr]={cantDormitorios: {$gt: 5}};
				filtro.$or[indiceFiltroOr+1]={cantDormitorios: aux};
				indiceFiltroOr=indiceFiltroOr+2;
			}
			else{//solo se selecciono +5
				filtro.cantDormitorios= {$gt: 5};
			}
		}
		else{
			filtro.cantDormitorios=aux;
		}
	}
}

function setFiltroBanios(filtro){
	var aux=$('#banosCheckboxes').val();

	if(aux!==null){

		if(aux[aux.length-1]==="+3"){ //se selecciono la opcion +3
			delete aux[aux.length-1];
			if(aux.length>0){ //se seleccionó otra opción además de +3
				if(indiceFiltroOr==0)
					filtro.$or=[];
				filtro.$or[indiceFiltroOr]={cantBanios: {$gt: 3}};
				filtro.$or[indiceFiltroOr+1]={cantBanios: aux};
				indiceFiltroOr=indiceFiltroOr+2;
			}
			else{//solo se selecciono +5
				filtro.cantBanios= {$gt: 3};
			}
		}
		else{
			filtro.cantBanios=aux;
		}
	}
}

function setFiltroCocheras(filtro){
	var aux=$('#cocherasCheckboxes').val();

	if(aux!==null){

		if(aux[aux.length-1]==="+2"){ //se selecciono la opcion +5
			delete aux[aux.length-1];
			if(aux.length>0){ //se seleccionó otra opción además de +5
				if(indiceFiltroOr==0)
					filtro.$or=[];
				filtro.$or[indiceFiltroOr]={cantCocheras: {$gt: 5}};
				filtro.$or[indiceFiltroOr+1]={cantCocheras: aux};
				indiceFiltroOr=indiceFiltroOr+2;
			}
			else{//solo se selecciono +5
				filtro.cantCocheras= {$gt: 5};
			}
		}
		else{
			filtro.cantCocheras=aux;
		}
	}
}


function setFiltroPrecio(filtro){

 	filtro.precio={$lte: document.getElementById("miRango").value};

}

//VEEEEEEEERRRR, METE TODOS LOS OR ADENTRO, SOLO SE FIJA POR UNO