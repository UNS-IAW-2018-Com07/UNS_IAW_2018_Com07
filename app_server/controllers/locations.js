/* GET home page. */
module.exports.homelist = function (req, res) { 
  res.render('buildings-list', { 
  	title: 'Inicio',
  	viviendas: [{
            "piso": 3,
            "numeroDepto": "C",
            "compartido": false,
            "operacion": "Alquiler",
            "direccion": "Zelarrayan 150",
            "precio": 7000,
            "anioConstruccion": 2003,
            "metrosCuadrados": 65,
            "cantAmbientes": 2,
            "cantBanios": 1,
            "cantCocheras": 0,
            "cantDormitorios": 1,
            "descripcion": "bla bla esta casa es muy genial bla bla vistas bla bla el mejor precio bla bla",
            "imagenes": ["images/Vieytes223/3C/im1.jpg", "images/Vieytes223/3C/im2.jpg"],
            "propietario": 34236595419,
            "id": 2
        },
        {
            "piso": 4,
            "numeroDepto": "D",
            "compartido": true,
            "operacion": "Alquiler",
            "direccion": "Vieytes 223",
            "precio": 5500,
            "anioConstruccion": 2015,
            "metrosCuadrados": 57,
            "cantAmbientes": 2,
            "cantBanios": 1,
            "cantCocheras": 1,
            "cantDormitorios": 1,
            "descripcion": "bla bla esta casa es muy genial bla bla vistas bla bla el mejor precio bla bla",
            "imagenes": ["images/Vieytes223/4D/im1.jpg", "images/Vieytes223/4D/im2.jpg"],
            "propietario": 34236595419,
            "id": 3
        }
    ]});
};

/* GET Location Info page. */
module.exports.locationInfo = function (req, res) { 
  res.render('layout', { title: 'Detalle Vivienda' });
};

/* GET Add Location page. */
module.exports.addLocation = function (req, res) { 
  res.render('layout', { title: 'Añadir Vivienda' });
};