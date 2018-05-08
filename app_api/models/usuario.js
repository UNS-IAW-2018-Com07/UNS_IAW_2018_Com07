var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 

const UsuarioSchema = new mongoose.Schema ({
	id: {
		type: String, 
		// unique: true
	},  
	token: String, 
	nombre: String, 
	foto: String, 
	fechaCreacion: {type:Date, "default": Date.now},
	estilo: {
		type: String,
		enum: ['Rosa','Azul']
	}

}); 

mongoose.model('Usuario', UsuarioSchema); 