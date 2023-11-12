import React from 'react'
export default function SuccessDisplay({ sessionId }) {
    return (
        <section>
            <div className="product Box-root">
                <div className="description Box-root">
                    <h3>Subscription to starter plan successful!</h3>
                </div>
            </div>
            <form action="http://localhost:8000/create-portal-session/" method="POST">
                <input
                    type="hidden"
                    id="session-id"
                    name="session_id"
                    value={sessionId}
                />
                <button id="checkout-and-portal-button" type="submit">
                    Manage your billing information
                </button>
            </form>
        </section>
    );
}
