var express = require('express'); 
var router = express.Router();
var passport = require('passport');

var middleware = require('../auth/middleware'); 

var ctrlAuthentication = require('../controllers/auth'); 

// Ruta para autenticarse con Google (enlace de login)
router.get('/google', passport.authenticate('google', { scope : 'profile' }));
// Ruta de callback, a la que redirigirá tras autenticarse con Google.
// En caso de fallo redirige a la vista '/' (inicio)
router.get('/google/callback', 
	passport.authenticate('google', {
        successRedirect : '/',
        failureRedirect : '/'
    }));

router.get('/unlink', middleware, ctrlAuthentication.unlink);
router.get('/logout', ctrlAuthentication.logout);

module.exports = router; 