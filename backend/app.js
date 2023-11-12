'use strict';
const dotenv = require('dotenv');
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const subscriptionRoute = require('./routes/subscription');

// Import routes for authentication
const userLogin = require('./routes/auth');
const userSignUp = require('./routes/auth');
const adminLogin = require('./routes/auth');
const subscribe = require('./routes/subscription')
const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
// Routes
app.use('/api/auth/', userLogin);
app.use('/api/auth/', userSignUp);

//subscribe
app.use('/api/subscribe/', subscriptionRoute);

module.exports = app;
