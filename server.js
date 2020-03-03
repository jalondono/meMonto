const express = require('express');
const morgan = require('morgan');
const {VehiclesController} = require('./src/controllers')
//const users = require('./src/routes/users.router')

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/vehicle', VehiclesController)
//app.use('/api/user', vehicles)

module.exports = app;