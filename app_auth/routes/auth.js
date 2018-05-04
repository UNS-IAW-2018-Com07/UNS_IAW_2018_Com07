var express = require('express'); 
var router = express.Router();

var middleware = require('../auth/middleware'); 

var ctrlAuthentication = require('../controllers/auth'); 

// Ruta para autenticarse con Google (enlace de login)
router.get('/auth/google', ctrlAuthentication.loginGoogle);
router.get('/auth/google/callback', ctrlAuthentication.loginGoogleCallback);
router.get('/unlink', middleware, ctrlAuthentication.loginGoogleCallback);
router.get('/logout', ctrlAuthentication.logout);

module.exports = router; 