/* GET home page. */
const index = function (req, res) { 
  res.render('index', { title: 'Probando la pagina' });
};

module.exports = {
  index
}