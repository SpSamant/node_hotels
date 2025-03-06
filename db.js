const mongoose = require('mongoose');

// define the mongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels';


// set up mongoDB connection
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// get the deafult connection
// mongoose maintains a default connection object representing the mongoDB connection
const db = mongoose.connection;

// define event listeners for database connection 

db.on('connected',() =>{
    console.log('connected to mongodb server');
});
db.on('error',() =>{
    console.log('  mongodb connection error');
})
db.on('disconnected',() =>{
    console.log('  mongodb disconnected');
})

module.exports = db;
