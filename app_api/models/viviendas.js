const mongoose = require('mongoose');

function esEntero(Numero){
	return Numero.isInteger;
}

const errNoEsEntero = '{VALUE} is not an integer value';

var ObjectId = mongoose.Schema.Types.ObjectId;

const comentarioSchema = new mongoose.Schema({
	idUsuario: {
		type: String,
		required: true
	},
	calificacion: {
		type: Number,
		min: 0,
		max: 5,
		required: true
	},
	fecha: {
		type: Date, 
		"default": Date.now,
		required: true
	},
	texto: {
		type: String,
		required: true
	}

});

const viviendaSchema = new mongoose.Schema({
  tipoVivienda:{
     type: String,
     enum: ['Casa','Departamento'],
     required: true
  },
  piso: {
    type: String
  },
  numeroDepto: {
    type: String
  },
  compartido: {
    type: Boolean,
    default: false
  },
  operacion: {
    type: String,
    enum: ['Venta','Alquiler'],
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  precio: {
  	type: Number,
  	required: true
  },
  anioConstruccion: {
    type: Number,
    validate : [esEntero,errNoEsEntero],
    required: true
  },
  metrosCuadrados: {
  	type: Number,
  	required: true
  },
  anioConstruccion: {
    type: Number,
    validate : [esEntero,errNoEsEntero],
    required: true
  },
  cantAmbientes: {
    type: Number,
    validate : [esEntero,errNoEsEntero],
    required: true
  },
  cantBanios: {
    type: Number,
    validate : [esEntero,errNoEsEntero],
    required: true
  },
  cantCocheras: {
    type: Number,
    validate : [esEntero,errNoEsEntero],
    required: true
  },
  cantDormitorios: {
    type: Number,
    validate : [esEntero,errNoEsEntero],
    required: true
  },
  descripcion: String,
  imagenes: {
    type: [String],
    default: ["images/noImage.gif"] 
  },
  calificacion: {
    type: Number, 
    "default": 0, 
    min: 0, 
    max: 5
  },
  propietario: {
  	type: Number,
  	required: true
  },
  comentarios: [comentarioSchema],
  id: ObjectId
});

mongoose.model('Vivienda', viviendaSchema);
mongoose.model('Comentario', comentarioSchema);
