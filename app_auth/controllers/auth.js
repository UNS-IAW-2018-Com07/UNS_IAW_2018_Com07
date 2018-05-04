var passport = require('passport');

const loginGoogle = function(req, res) {
    passport.authenticate('google', { scope : 'profile' });
};

const loginGoogleCallback = function(req, res) {
    // Ruta de callback, a la que redirigirá tras autenticarse con Google.
    // En caso de fallo redirige a la vista '/' (inicio)
    passport.authenticate('google', {
        successRedirect : '/',
        failureRedirect : '/'
    });
};

const logout = function(req, res) {
    req.logout();
    res.redirect('/');
};

const unlink = function(req, res) {
    var user = req.user;
    user.id = undefined;
    user.save(function(err) {
        res.redirect('/');
    });
};

module.exports = {
  unlink, loginGoogleCallback, loginGoogle, logout
}; 