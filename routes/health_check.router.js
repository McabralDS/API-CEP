// Rota Health Check
const express = require('express');

let health_check = express.Router();

health_check.get('/', (req, res) => {
    res.json({
        "api": process.env.API_NAME,
        "version": process.env.VERSION,
        "status": 'OK'
    })
})

module.exports = health_check;