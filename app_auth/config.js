//Se setea el URL por defecto del server para desarrollo local.
var apiOptions = 'http://localhost:3000/auth/google/callback';

//Si la aplicacion se ejecuta en "production mode" se setea una base URL diferente. 
if(process.env.NODE_ENV == 'production')
	apiOptions = 'https://ktphi.herokuapp.com/auth/google/callback';

var config = {

    'googleAuth' : {
        'clientID'         : '295229625606-n9qt2kign264nocnmhl9c6ujnd2cr7jh.apps.googleusercontent.com',
        'clientSecret'     : '4KH0pp0dst9WyZm7e8mbjCJ7',
        'callbackURL'      : apiOptions
    }
    
};

module.exports = config;

