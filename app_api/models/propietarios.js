const mongoose = require('mongoose');

const propietarioSchema = new mongoose.Schema({
  cuit: {
    type: String,
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
  	type: String,
    required: true,
  }
});

mongoose.model('Propietario', propietarioSchema);