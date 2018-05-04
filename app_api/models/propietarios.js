const mongoose = require('mongoose');

function esEntero(Numero){
	return Numero.isInteger;
}

const errNoEsEntero = '{VALUE} is not an integer value';

const propietarioSchema = new mongoose.Schema({
  cuit: {
    type: Number,
    validate : [esEntero,errNoEsEntero],
    required: true,
    unique: true,
    dropDups: true
  },
  nombre: {
  	type: String,
  	required: true
  },
  correoElectronico: {
  	type: String,
  	required: true
  },
  telefono: {
  	type: Number,
	  validate : [esEntero,errNoEsEntero],
    required: true,
  }
});

mongoose.model('Propietario', propietarioSchema);