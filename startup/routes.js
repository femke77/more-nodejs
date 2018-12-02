const express = require('express');
const catfacts = require('../routes/catfacts');
 
module.exports = function(app){
    app.use(express.json());
    app.use('/catfacts', catfacts);

}