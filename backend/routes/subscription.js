const express = require('express');
const router = express.Router();
const subscriptionController = require('../controller/subscription');

router.post('/create-checkout-session', subscriptionController.postSubscription);

module.exports = router;
