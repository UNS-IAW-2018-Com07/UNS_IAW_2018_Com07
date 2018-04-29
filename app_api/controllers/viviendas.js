const mongoose = require('mongoose');
const Vivienda = mongoose.model('Vivienda');

const getViviendas = function (req, res) {
	Vivienda
		.find()
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
}

const getViviendaPorId = function (req, res) {
	Vivienda
		.findById(req.params.id)
		.exec((err, vivienda) =>{
			if (err) { 
				res
					.status(404)
					.json(err);    
        	} else {
				res
					.status(200)
					.json(vivienda);
			}
		})
}

module.exports = {
	getViviendas,
	getViviendaPorId
};
