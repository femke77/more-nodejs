const express = require('express');
const app = express();
const db = require('./startup/db');
const url = 'mongodb://localhost/morefun';
const axios = require('axios');

require('./startup/routes')(app); 

const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));


db.connect(url, function(err) {
    if (err){
        console.log('Cannot connect to db');
        process.exit(1);                     
    } else {
        console.log(`Connected to ${url}`);        
       
    }
});


module.exports = server;




