const express = require('express');
const router = express.Router();
const db = require('../startup/db');
require('express-async-errors');

router.get('/', async (req, res) => {
    let sortby = parseInt(req.query.sortby);
    console.log(sortby)
    if (isNaN(sortby)){
        db.get().collection('catfacts').find({}, {projection: {fact: 1, _id: 0}}).toArray((err, result) => {
            if(err) return console.log(err); 
            res.render('facts', {facts: result});
        });
    }
    else {
        
        query = {fact: sortby}
        db.get().collection('catfacts').find({}, {projection: {fact: 1, _id: 0}}).sort(query).toArray((err, result) => {
            if(err) return console.log(err);      
            res.render('facts', {facts: result});
        });
        
    }
});
  




module.exports = router;


