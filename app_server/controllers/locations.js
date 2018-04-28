/* GET home page. */
module.exports.homelist = function (req, res) { 
  res.render('buildings-list', { title: 'Inicio'});
};

/* GET Location Info page. */
module.exports.locationInfo = function (req, res) { 
  res.render('layout', { title: 'Detalle Vivienda' });
};

/* GET Add Location page. */
module.exports.addLocation = function (req, res) { 
  res.render('layout', { title: 'Añadir Vivienda' });
};