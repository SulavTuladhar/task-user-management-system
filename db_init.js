// Database connection setup
const dbConfig = require('./configs/db.config');
const mongoose = require('mongoose');

mongoose.connect(dbConfig.connectionURL + '/' + dbConfig.dbName, {
    useUnifiedTopology: true,
    useNewUrlParser: true
} ,function(err,done){
    if(err){
        console.log('Database connection failed');
    }else{
        console.log('Database connection open');
    }
})