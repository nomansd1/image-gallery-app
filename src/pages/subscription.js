
//app/stripe/page.jsx
"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useCallback, useState, useEffect } from "react";
import getStripe from "../components/getStripe";
import { NextResponse } from "next/server";
const stripePromise = getStripe();
const projectUrl = process.env.NEXTAUTH_URL;
async function postSubscribe(e) {
    try {
        const dataSend = {
            lookup_key: e.target.lookup_key.value,
            customerEmail: e.target.user_Email.value,
        };
        const jsonSend = JSON.stringify(dataSend);
        response = await fetch("api/route", {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json", },
            redirect: "follow",
            body: jsonSend,
        });
        if (response.statusCode === 500) {
            console.error(response.message);
            return;
        }
        return response;
    } catch (err) { console.log(`Error when calling postJSON: `, err.message); }
}

const ProductDisplay = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const userEmail = session?.user.email;
    const priceLookupKey = process.env.NEXT_PUBLIC_STRIPE_PRICE_KEY;
    const [loading, setLoading] = useState(false);

    async function getStripeScript() {
        if (!stripe) { const stripe = await stripePromise; }
    }

    if (!priceLookupKey || !userEmail || !session) { console.log("Loading..."); }

    return (
        <section>
            <div className="product">
                <div className="description">
                    <h3>Starter plan</h3>
                    <h5>$10.00 / month</h5>
                </div>
            </div>
            <form action="/api/route" method="POST">
                {/* Add a hidden field with the lookup_key of the price */}
                <input
                    required
                    type="hidden"
                    name="lookup_key"
                    value={priceLookupKey}
                />
                {/* Add a hidden field with the customer email */}
                <input
                    required
                    type="hidden"
                    name="user_Email"
                    value={userEmail}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                />
                <button id="checkout-button" type="submit">
                    Checkout
                </button>
            </form>
        </section>
    );
};


const SuccessDisplay = ({ sessionId }) => {
    return (
        <section>
            <div className="product Box-root">
                <div className="description Box-root">
                    <h3>Subscription to starter plan successful!</h3>
                </div>
            </div>
            ...
        </section>
    );
};

const Message = ({ message }) => (
    <section>
        <p>{message}</p>
    </section>
);

const SubscribtionPage = () => {
    let [message, setMessage] = useState("");
    let [success, setSuccess] = useState(false);
    let [session_Id, setSessionId] = useState("");

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get("success")) {
            setSuccess(true);
            setSessionId(query.get("session_id"));
        }
        if (query.get("canceled")) {
            setSuccess(false);
            setMessage("Order canceled");
        }
    }, [session_Id]);

    if (!success && message === "") {
        return <ProductDisplay />;
    } else if (success && session_Id !== "") {
        return <SuccessDisplay sessionId={session_Id} />;
    } else {
        return <Message message={message} />;
    }
};
export default SubscribtionPage;