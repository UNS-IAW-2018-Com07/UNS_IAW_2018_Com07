/* GET about page. */
module.exports.about = function (req, res) { 
  res.render('layout', { title: 'About' });
};
