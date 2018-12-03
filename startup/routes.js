const express = require('express');
const catfacts = require('../routes/catfacts');
const home = require('../routes/home');
 
module.exports = function(app){
    app.use(express.json());
    app.use('/catfacts', catfacts);
    app.use('/home', home);
    
    app.set('views', './views');
    app.set('view engine', 'pug');
}