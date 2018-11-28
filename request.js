const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');

const getFacts = () => {
    try{
        return axios.get('https://cat-fact.herokuapp.com/facts');
    } catch (error) {
        console.error(error);
    }
}


exports.getFacts = getFacts;