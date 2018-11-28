const express = require('express');
const app = express();



require('./startup/routes')(app); 
require('./startup/db')();

const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));


//axios.get('https://cat-fact.herokuapp.com/facts').then((result) => console.log(JSON.stringify(result.data, null, 2)));


module.exports = server;