const express = require('express');
const morgan = require('morgan');
const vehicles = require('./src/routes/vehicles.router')
//const users = require('./src/routes/users.router')

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/vehicle', vehicles)
//app.use('/api/user', vehicles)

module.exports = app;