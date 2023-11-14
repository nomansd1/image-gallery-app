const moment = require('moment/moment');
const subscription = require('../models/subscription');
const dotenv = require('dotenv');
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const stripeSession = async (price, lookupKey) => {
    const YOUR_DOMAIN = 'http://localhost:3000';
    try {
        const session = await stripe.checkout.sessions.create({
            billing_address_collection: 'auto',
            line_items: [
                {
                    price: price,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            payment_method_types: ['card'],
            success_url: `${YOUR_DOMAIN}/Success`,
            cancel_url: `${YOUR_DOMAIN}?canceled=true`,
        });
        return session;
    } catch (e) {
        throw e;
    }
};

const postSubscription = async (req, res) => {
    let price = "price_1OB2vzCuy52IK8zWACRExqb3"
    const { _id } = req.body;
    try {
        const session = await stripeSession(price);
        console.log(session, "session=============");
        console.log(_id, "_id===================");
        const result = new subscription({
            userId: _id,
            sessionId: session.id,
        });
        const data = await result.save();
        res.status(200).send({
            result: {
                userId: data.userId,
                sessionId: data.sessionId,
                createdAt: data.createdAt,
                redirectUrl: session.url,
                session: session
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
};
const getSubscriptionByUserId = async (req, res) => {
    const userId = req.params.id;
    console.log(userId, "userId================");
    try {
        const subscriptions = await subscription.findOne({
            userId: userId
        });

        if (!subscriptions || subscriptions.length === 0) {
            return res.status(404).send({ error: 'Not found' });
        }
        res.status(200).send({ subscriptions });
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
};
const postCheckoutSuccess = async (req, res) => {
    const { sessionId } = req.body;
    console.log(req.body, "req.body==================");
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId)
        console.log(session, "session");
        if (session.payment_status === 'paid') {
            const subscriptionId = session.subscription
            const my_subscription = await stripe.subscriptions.retrieve(subscriptionId)
            const planId = my_subscription.plan.id
            console.log(planId);
            let planType = ''
            if (my_subscription.plan.amount === 1000) {
                planType = 'monthly'
            }
            const startDate = moment.unix(my_subscription.current_period_start).format('YYYY-MM-DD');
            const endDate = moment.unix(my_subscription.current_period_end).format('YYYY-MM-DD');
            const durationInSecond = my_subscription.current_period_end - my_subscription.current_period_start
            const durationInDays = moment.duration(durationInSecond, 'seconds').asDays()
            // Use findOneAndUpdate to find and update based on sessionId
            const result = await subscription.findOneAndUpdate(
                { sessionId: sessionId },
                {
                    $set: {
                        subscriptionId: subscriptionId,
                        invoice: session.invoice,
                        plan: planType,
                        userName: session.name,
                        userEmail: session.email,
                        startDate: startDate,
                        endDate: endDate,
                        durationInDays: durationInDays
                        // other fields you want to update
                    }
                },
                { new: true }  // Return the modified document
            );
            // If no matching document is found, create a new subscription
            if (!result) {
                return res.status(404).send("Session Id is not found")

            } else {
                return res.status(200).send({ updatedSubscription: result });
            }
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
};
module.exports = {
    getSubscriptionByUserId,
    postSubscription,
    postCheckoutSuccess
};
