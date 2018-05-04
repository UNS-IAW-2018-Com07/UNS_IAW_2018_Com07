// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

	res
		.status(401)
		.json({'error': 'No autorizado'});
    //res.redirect('/');
}   

module.exports = isLoggedIn;