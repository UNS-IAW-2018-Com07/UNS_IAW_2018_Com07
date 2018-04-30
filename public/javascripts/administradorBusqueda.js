const queryString = require('query-string');

function buscar(){

	var filtro='';

	//faltan las &

	if (document.getElementById("Alquiler").checked === true && document.getElementById("Compra").checked === false){
	 	filtro='operacion=Alquiler';
	}
	else {
	 	if (document.getElementById("Compra").checked === true && document.getElementById("Alquiler").checked === false){
	 		filtro='operacion=Venta';
	}
	//Si apreto los dos o ninguno, es lo mismo, busca tanto alquiler como compra

	if (document.getElementById("Departamento").checked === true && document.getElementById("Casa").checked === false){
	 	filtro='piso=$ne=null&numeroDepto=$ne=null';
	}
	else {
	 	if (document.getElementById("Casa").checked === true && document.getElementById("Departamento").checked === false){
	 		filtro='piso=null&numeroDepto=null';
	}
	//Si apreto los dos o ninguno, es lo mismo, busca tanto casa como departamentos

	filtro='compartido='+document.getElementById("viviendaCompartida").checked;

	/*var aux={$in: $('#ambienteCheckboxes').val()};

	filtro='cantAmbientes='+queryString.stringify(aux, {arrayFormat: 'bracket'});*/


}