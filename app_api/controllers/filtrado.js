
//ver el capitulo 6 del libro
//la funcion no contempla que retorne vacio o que no existan los parametros

const mongoose = require('mongoose');
const Vivienda = mongoose.model('Vivienda');

const queryString = require('query-string');

const getViviendas = function (req, res) {

	const parsed = queryString.parse(req.params.filtro);

	//delete parsed.probando;

	if(parsed.piso)
		if(parsed.piso==='null')
			parsed.piso=null;
		else
			parsed.piso=queryString.parse(parsed.piso);
	
	if(parsed.numeroDepto)
		if(parsed.numeroDepto==='null')
			parsed.numeroDepto=null;
		else
			parsed.numeroDepto=queryString.parse(parsed.numeroDepto);

	parsed.precio=queryString.parse('$gt='+parsed.precio); //No se fija si existe porque siempre esta el precio en el filtro

	if(parsed.masAmbientes){
		delete parsed.masAmbientes;

		//var gt5=queryString.parse('$gt='+'5');

		//console.log(parsed.cantAmbientes);

		//noandaaaaaaaaaaaaa var arrayAmbientes=querystring.stringify({'cantAmbientes': parsed.cantAmbientes});
		
		//console.log(arrayAmbientes);

		//var or=queryString.parse('$or[]='+arrayAmbientes+'&$or[]='+gt5);

		//parsed.cantAmbientes=or;
	}

	console.log(parsed); //es para testear, se puede borrar

	Vivienda
		.find(parsed)
		.exec((err, viviendas) => {
			if (err) { 
				res
					.status(404)
					.json(err);    
        	} else {
				res
					.status(200)
					.json(viviendas);
			}
		})
};

module.exports = {
	getViviendas
};