const subscription = require('../models/subscription');
const stripe = require('stripe')("sk_test_51HueyACuy52IK8zWn9Ef86gep5H2mOfUzzG7RyVTKljxYxbvFGkPFGDfhrmo3zOLIrjkGWMtdAggOTPTjkbzbqfA00I2P1sDa0");
const stripeSession = async (price, lookupKey) => {
    const YOUR_DOMAIN = 'http://localhost:3000';
    try {
        const prices = await stripe.prices.list({
            lookup_keys: [lookupKey],
            expand: ['data.product'],
        });
        const session = await stripe.checkout.sessions.create({
            billing_address_collection: 'auto',
            line_items: [
                {
                    price: prices.data[0].id,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            payment_method_types: ['card'],
            success_url: `${YOUR_DOMAIN}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${YOUR_DOMAIN}?canceled=true`,
        });
        return session;
    } catch (e) {
        throw e;
    }
};

const postSubscription = async (req, res) => {
    const price = "price_1OB2vzCuy52IK8zWACRExqb3"
    const { _id, username, email, plan, lookup_key } = req.body;

    try {
        const session = await stripeSession(price, lookup_key);
        console.log(session, "session=============");
        const result = new subscription({
            userId: _id,
            plan: plan,
            userName: username,
            userEmail: email,
            subscriptionId: session.id,
        });

        const data = await result.save();

        res.status(200).send({
            result: {
                username: data.username,
                email: data.email,
                plan: data.plan,
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

module.exports = {
    postSubscription,
};
