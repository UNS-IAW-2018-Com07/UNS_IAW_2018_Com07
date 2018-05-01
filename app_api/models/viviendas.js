const mongoose = require('mongoose');

function esEntero(Numero){
	return Numero.isInteger;
}

const errNoEsEntero = '{VALUE} is not an integer value';

var ObjectId = mongoose.Schema.Types.ObjectId;

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

const comentarioSchema = new mongoose.Schema({
	usuario: {
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
  piso: {
    type: Number,
    validate : [esEntero,'{VALUE} is not an integer value'],
    default: null
  },
  numeroDepto: {
    type: String,
    default: null
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
  imagenes: [String],
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
mongoose.model('Propietario', propietarioSchema);