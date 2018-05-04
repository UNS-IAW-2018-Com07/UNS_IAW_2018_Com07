var mongoose = require('mongoose'); 
var User = mongoose.model('Usuario');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Fichero de configuración donde se encuentran las API keys
// Este archivo no debería subirse a GitHub ya que contiene datos
// que pueden comprometer la seguridad de la aplicación. 
// Como es una aplicacion de prueba no importa :). 
var configAuth = require('./config');

// Exportamos como módulo las funciones de passport, de manera que
// podamos utilizarlas en otras partes de la aplicación.
module.exports = function(passport){
	//configuracion del passport
	// used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

	// Configuración del autenticado con Github
	passport.use(new GoogleStrategy({
        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,
        //Nos permite pasar el req de nuestra route para chequear si un usuario esta logueado o no
        passReqToCallback : true 
	    },
	    function(req, token, refreshToken, profile, done) {
	        // asincronico
	        process.nextTick(function() {
	            // Chequea si el usuario esta logueado
	            if (!req.user) {
	                User.findOne({ 'id' : profile.id }, function(err, user) {
	                    if (err)
	                        return done(err);

	                    if (user) {
	                        //Existe un usuario con ese id pero sin token (el usuario fue linkeado en algun punto y luego removido) 
	                        if (!user.token) {
	                            user.token = token;
	                            user.nombre  = profile.displayName;
	                            user.foto = (profile.photos[0].value || ''); 

	                            user.save(function(err) {
	                                if (err)
	                                    return done(err);
	                                    
	                                return done(null, user);
	                            });
	                        }
	                        return done(null, user);
	                    } else {
	                        var newUser = new User();

	                        newUser.id    = profile.id;
	                        newUser.token = token;
	                        newUser.nombre  = profile.displayName;
	                        newUser.foto = (profile.photos[0].value || ''); 

	                        newUser.save(function(err) {
	                            if (err)
	                                return done(err);
	                                
	                            return done(null, newUser);
	                        });
	                    }
	                });
	            } else {
	            	//El usuario existe y se encuentra logueado, debemos linkear la cuenta. 
	                var user = req.user; // obtenemos el usuario a partir de session

	                user.id = profile.id;
	                user.token = token;
	                user.nombre  = profile.displayName;
	                user.foto = (profile.photos[0].value || '');

	                user.save(function(err) {
	                    if (err)
	                        return done(err);
	                        
	                    return done(null, user);
	                });
	            }
	        });
    }));
}
