const express = require('express');
const app = express();
const {connect}= require('./startup/db');
const url = 'mongodb://localhost/morefun';


require('./startup/routes')(app); 

const port = process.env.PORT || 5000;


connect(url, function(err) {
    if (err){
        console.log('cannot connnect to db');
        process.exit(1);
    } else {
        app.listen(port, () => console.log(`Connected to ${url} and express listening on port ${port}`));
    }
});

//test:
//axios.get('https://cat-fact.herokuapp.com/facts').then((result) => console.log(JSON.stringify(result.data, null, 2)));

