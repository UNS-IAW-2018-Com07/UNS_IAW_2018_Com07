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

module.exports = {
	getViviendas
};