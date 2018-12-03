const express = require('express');

 
module.exports = function(app){       
    app.set('views', './views');
    app.set('view engine', 'pug');
}