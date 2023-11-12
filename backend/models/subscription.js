var mongoose = require('mongoose');
var Subscription = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    plan: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    subscriptionId: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
module.exports = new mongoose.model('subscription', Subscription);
