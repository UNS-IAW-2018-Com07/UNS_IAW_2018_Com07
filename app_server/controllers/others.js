/* GET login page. */
module.exports.login = function (req, res) { 
  res.render('layout', { title: 'Login' });
};

/* GET about page. */
module.exports.about = function (req, res) { 
  res.render('layout', { title: 'About' });
};
