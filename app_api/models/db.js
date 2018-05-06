const mongoose = require('mongoose');

//Se setea el URL por defecto del server para desarrollo local. 
var dbURI = 'mongodb://localhost/database';

//Si la aplicacion se ejecuta en "production mode" se setea una base URL diferente. 
if(process.env.NODE_ENV == 'production')
  dbURI=process.env.MLAB_URI;
  
mongoose.connect(dbURI); 

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', err => {
  console.log('Mongoose connection error:', err); 
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

const gracefulShutdown = (msg, callback) => {            
  mongoose.connection.close( () => {                     
    console.log(`Mongoose disconnected through ${msg}`); 
    callback();                                          
  });
};

process.once('SIGUSR2', () => {                    
  gracefulShutdown('nodemon restart', () => {      
    process.kill(process.pid, 'SIGUSR2');          
  });
});
process.on('SIGINT', () => {                       
  gracefulShutdown('app termination', () => {       
    process.exit(0);                               
  });
});
process.on('SIGTERM', () => {                      
  gracefulShutdown('Heroku app shutdown', () => {  
    process.exit(0);                               
  });
});

require('./viviendas');
require('./usuario'); 
require('./propietarios'); 

