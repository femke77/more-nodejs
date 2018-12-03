const express = require('express');
const router = express.Router();
const db = require('../startup/db');
require('express-async-errors');

router.get('/', async (req, res) => {
    
    db.get().collection('catfacts').find({}, {projection: {fact: 1, _id: 0}}).toArray((err, result) => {
        if(err) return console.log(err);
        //res.send(result);  
        res.render('facts', {facts: result});
    });
});
  




module.exports = router;


