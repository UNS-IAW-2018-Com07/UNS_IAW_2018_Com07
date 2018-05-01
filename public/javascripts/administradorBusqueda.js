function buscar(){

	var filtro=getFiltroCompartido(); //nunca retorna null

	var aux1=getFiltroTipoVivienda();
	filtro=unirFiltros(filtro,aux1);

	var aux2=getFiltroOperacion();
	filtro=unirFiltros(filtro,aux2);

	var aux3=getFiltroAmbientes();
	filtro=unirFiltros(filtro,aux3);	

	/*var aux4=getFiltroDormitorios();
	filtro=unirFiltros(filtro,aux4);

	var aux5=getFiltroBanios();
	filtro=unirFiltros(filtro,aux5);	

	var aux6=getFiltroACocheras();
	filtro=unirFiltros(filtro,aux6);*/	//no estan hechos porque me falta ver el +5 (despues son todos iguales a ambientes)	

	var aux7=getFiltroPrecio();
	filtro=unirFiltros(filtro,aux7);

	console.log(filtro); //es para testear, se puede borrar

	$.get("./api/filtrado/"+filtro, function (viviendas) {
         console.log(viviendas);   
        });
}

function unirFiltros(filtro, aux){
	//Asume filtro no nulo
	var respuesta;

	if(aux!==null)
		respuesta=filtro+'&'+aux;
	else
		respuesta=filtro;

	return respuesta;
}

function getFiltroCompartido(){
	var filtro;

	filtro='compartido='+document.getElementById("viviendaCompartida").checked;

	return filtro;
}

function getFiltroTipoVivienda(){
	var filtro=null;

	if (document.getElementById("Departamento").checked === true && document.getElementById("Casa").checked === false)
	 	filtro='piso=$ne&numeroDepto=$ne';
	else 
	 	if (document.getElementById("Casa").checked === true && document.getElementById("Departamento").checked === false)
	 		filtro='piso=null&numeroDepto=null';
	//Si apreto los dos o ninguno, es lo mismo, busca tanto casa como departamentos

	return filtro;
}

function getFiltroOperacion(){
	var filtro=null;

	if (document.getElementById("Alquiler").checked === true && document.getElementById("Compra").checked === false)
	 	filtro='operacion=Alquiler';
	else 
	 	if (document.getElementById("Compra").checked === true && document.getElementById("Alquiler").checked === false)
	 		filtro='operacion=Venta';
	//Si apreto los dos o ninguno, es lo mismo, busca tanto alquiler como compra

	return filtro;
}


function getFiltroAmbientes(){
	var filtro=null;
	var aux=$('#ambienteCheckboxes').val();

	if(aux!==null){
		var i=1;
		var length=aux.length;
		var masCinco=false;

		if(aux[length-1]==="+5"){ //se selecciono la opcion +5{
			length--; 
			masCinco=true;
		}

		if(length>0){ //se seleccionó al menos una opción que no es +5
			filtro='cantAmbientes='+aux[0];
			if(length>1) //hay mas de un elemento, sin contar el +5
				filtro=filtro+'&';
		}

		while(i<length){
			filtro=filtro+'cantAmbientes='+aux[i];
			if(i<length-1) //no es el último
				filtro=filtro+'&';
			i++;
		}

		if(masCinco){
			filtro=unirFiltros('masAmbientes=true',filtro);
		}
	}

	return filtro;
}

function getFiltroPrecio(){
	var filtro=null;

 	filtro='precio='+document.getElementById("miRango").value;

	return filtro;
}