const express = require('express');
const router = express.Router();
const db = require('../startup/db');
require('express-async-errors');

router.get('/', async (req, res) => {
    
    db.get().collection('catfacts').find().toArray((err, result) => {
        if(err) return console.log(err);
        res.send(result);
    });
});
  




module.exports = router;


