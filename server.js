const express = require('express');
const { json, urlencoded } = require('body-parser');
const morgan = require('morgan');
const { signup, signin, protect } = require('./src/middlewares/auth');
const {UserRoute} = require('./src/routes');
const {VehicleRoute} = require('./src/routes');
const {BadgeRoute} = require('./src/routes');

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());

// signup / signin routes
app.post('/api/v1/signup', signup);
app.post('/api/v1/signin', signin);

// Protected routes
app.use('/api/v1', protect);
app.use('/api/v1/user', UserRoute);
app.use('/api/v1/vehicle', VehicleRoute);
app.use('/api/v1/badge', BadgeRoute);

module.exports = app;
