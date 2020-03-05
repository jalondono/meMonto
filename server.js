const express = require('express');
const morgan = require('morgan');
const {VehicleRoute} = require('./src/routes')
//const users = require('./src/routes/users.router')

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/vehicle', VehicleRoute);
//app.use('/api/user', vehicles)

module.exports = app;