
//ver el capitulo 6 del libro
//la funcion no contempla que retorne vacio o que no existan los parametros

const mongoose = require('mongoose');
const Vivienda = mongoose.model('Vivienda');

const queryString = require('query-string');

const getViviendas = function (req, res) {

console.log(req.query);

	Vivienda
		.find(req.query)
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