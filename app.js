const express = require('express');
const app = express();
const cors = require('cors')
const PORT = 8080;
require('./db_init');

// Importing api router
const API_ROUTER = require('./api.route');

// Enabling all requests
app.use(cors());

// Importing inbuild middleware
app.use(express.urlencoded({ //x-ww-form-urlencoded
    extended: true
}))
app.use(express.json()) //JSON parser

app.use('/api', API_ROUTER);

// 404 error handler
app.use(function(req,res,next){
    next({
        msg: 'page not found',
        status: 404
    })
})

// Error handleing middleware
app.use(function(err,req,res,next){
    res.status(err.status || 400)
    res.json({
        msg: err.msg || err,
        status: err.status| 400
    })
})

app.listen(PORT, function(err,done){
    if(err){
        console.log('Server listining failed', err)
    }
    console.log('Server listening to PORT', PORT);
})