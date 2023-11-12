'use strict';
const dotenv = require('dotenv');
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const Subscription = require('./models/subscription')
const { sendEmail } = require('./global-functions/GlobalFunctions');
const path = require('path');

// Import routes for authentication
const userLogin = require('./routes/auth');
const userSignUp = require('./routes/auth');
const managerLogin = require('./routes/auth');
const adminLogin = require('./routes/auth');
const { log } = require('console');

const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.post('/create-checkout-session', cors(), async (req, res) => {
  const prices = await stripe.prices.list({
    lookup_keys: [req.body.lookup_key],
    expand: ['data.product'],
  });
  const userName = req.body.username;
  const userEmail = req.body.email;
  const userId = req.body._id;
  const metadata = {
    userId: userId,
    userName: userName,
    userEmail: userEmail,
  }
  const session = await stripe.checkout.sessions.create({
    billing_address_collection: 'auto',
    line_items: [
      {
        price: prices.data[0].id,
        // For metered billing, do not pass quantity
        quantity: 1,
        // Set metadata as a property of the line item

      },
    ],
    metadata: metadata,
    mode: 'subscription',
    success_url: `http://localhost:3000/?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:3000/`,

  });
  const result = await stripe.checkout.sessions.retrieve(session.id);
  // const subscription = stripe.subscriptions.retrieve(result.subscription)
  // console.log(result)
  console.log(result)
  res.redirect(303, session.url);
});
app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  async (request, response) => {
    let event = request.body;
    // Replace this endpoint secret with your endpoint's unique secret
    // If you are testing with the CLI, find the secret by running 'stripe listen'
    // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
    // at https://dashboard.stripe.com/webhooks
    const endpointSecret = 'whsec_148c21614260e6296a68a61f1d07ae4d80f294d94b0570825a0b5289ec2799f6';
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = request.headers['stripe-signature'];
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }
    }
    let subscription;
    let status;
    // Handle the event
    switch (event.type) {
      case 'customer.subscription.trial_will_end':
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription trial ending.
        // handleSubscriptionTrialEnding(subscription);
        break;
      case 'customer.subscription.deleted':
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription deleted.
        // handleSubscriptionDeleted(subscriptionDeleted);
        break;
      case 'customer.subscription.created':
        subscription = event.data.object;
        status = subscription.status;
        const userId = subscription.metadata.userId;
        const userName = subscription.metadata.userName;
        const userEmail = subscription.metadata.userEmail;
        console.log(`Subscription status is =========================${status}.`);

        const subscriptionData = new Subscription({
          userId: userId,
          userEmail: userEmail,
          userName: userName,
          subscriptionId: subscription.id,
        })

        // Add other relevant subscription data
        const data = await subscriptionData.save();
        // Then define and call a method to handle the subscription created.
        // handleSubscriptionCreated(subscription);
        break;
      case 'customer.subscription.updated':
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is==================== ${status}.`);
        // Then define and call a method to handle the subscription update.
        // handleSubscriptionUpdated(subscription);
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);
// Custom middleware to set CORS headers
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
app.use('/api/auth/', managerLogin);
app.use('/api/auth/', adminLogin);

module.exports = app;
