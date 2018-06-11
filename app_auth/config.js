apiOptions = 'https://ktphi.herokuapp.com/auth/google/callback';

var config = {

    'googleAuth' : {
        'clientID'         : process.env.clientID,
        'clientSecret'     : process.env.clientSecret,
        'callbackURL'      : apiOptions
    }
  
};

module.exports = config;

