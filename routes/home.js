const express = require('express');
const router = express.Router();
const db = require('../startup/db');
require('express-async-errors');

router.get('/', async (req, res) => {
    res.render('home');
});



module.exports = router;