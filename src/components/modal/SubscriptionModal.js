import React, { useState, useEffect } from "react"
import ReactModal from "react-modal"
import SuccessDisplay from "../SubscriptionDisplay";
import { getUserInfo } from "@/utils/getUser";
import { BASE_URL } from "@/config/api";
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux";
import { createCheckOutSession } from "@/redux/features/subscriptionReducer";
export default function SubscriptionModal(props) {
    const  dispatch = useDispatch()
    const { auth } = useSelector((state) => state.auth)
    const router = useRouter()
    const { isOpen,handleClose } = props
    let [message, setMessage] = useState('');
    let [success, setSuccess] = useState(false);
    let [sessionId, setSessionId] = useState('');
    const isAuthenticated = Boolean(auth && Object.keys(auth).length != 0);
    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
            setSuccess(true);
            setSessionId(query.get('session_id'));
        }
        if (query.get('canceled')) {
            setSuccess(false);
            setMessage(
                "Order canceled -- continue to shop around and checkout when you're ready."
            );
        }
    }, [sessionId]);
    console.log(sessionId,"sessionId===============");
    const handleCheckout = async (event) => {
        event.preventDefault();
        try {
            if(isAuthenticated === false){
                router.push('/login')
            }
            else{
                let data = {
                    _id:auth?._id
                }
                dispatch(createCheckOutSession(data))
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <ReactModal
            isOpen={isOpen}
            ariaHideApp={false}
            className="reactmodal__container"
            style={{
                overlay: {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(255, 255, 255, 0.75)"
                },
                content: {
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    border: "1px solid #ccc",
                    overflow: "auto",
                    WebkitOverflowScrolling: "touch",
                    boxShadow:
                        "0px 1px 2px 0px rgba(60, 64, 67, 0.3), 0px 2px 6px 2px rgba(60, 64, 67, 0.15)",
                    borderRadius: "10px",
                    outline: "none",
                    backgroundColor: "#fff",
                    padding: "20px",
                    width: "900px",
                    height: "550px"
                }
            }}
        >
            <div className="flex min-h-screen pt-[30px] px-[40px]">
                {
                    !success && message === '' ? (
                        <div className="min-w-full">
                            <div className="flex justify-between">
                                <div>
                                <p className="text-[#00153B] text-[20px] leading-[40px] font-semibold">
                                Your Subscription
                            </p>
                                </div>
                                <div>
                                <button onClick={handleClose} type="button" class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span class="sr-only">Close menu</span>
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
                                </div>
                            </div>
                            
                            <div>
                                <p className="text-[#717F87] text-[15px] leading-[27px] font-medium">
                                    Aliquam sagittis sapien in nibh tincidunt fermentum. Morbi eleifend
                                    faucibus.
                                </p>
                            </div>

                            <div className="mt-[20px] grid grid-cols-3 gap-[20px]">
                                <div
                                    key={1}
                                    className="w-full bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y"
                                >
                                    <div className="pt-[15px] px-[25px] pb-[25px]">
                                        <div className="flex justify-end">
                                            <div className="bg-[#F6F6F7] rounded-[20px] flex justify-center align-center px-[12px]">
                                                <p className="text-[#00153B] text-[12px] leading-[28px] font-bold">
                                                    Starter
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[#00153B] text-[19px] leading-[24px] font-bold">
                                                Trial
                                            </p>
                                            <p className="text-[#00153B] text-[50px] leading-[63px] font-bold">
                                                Free
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                                                5 Credits
                                            </p>
                                            <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                                                1 User
                                            </p>
                                        </div>
                                    </div>
                                    <div className="pt-[25px] px-[25px] pb-[35px]">
                                        <div>
                                            <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                                Direct Phone Numbers
                                            </p>
                                            <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                                Landline Phone Numbers
                                            </p>
                                            <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                                Corporate email addresses
                                            </p>
                                            <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                                Propsetcs
                                            </p>
                                            <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                                Chrome Extension
                                            </p>
                                        </div>
                                        <div className="mt-[25px]">
                                            <form onSubmit={handleCheckout}>
                                                {/* Add a hidden field with the lookup_key of your Price */}
                                                <input type="hidden" name="lookup_key" value="12345" id="lookup_key" />
                                                <button id="checkout-and-portal-button" type="submit" className='checkout'>
                                                    Checkout
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    key={2}
                                    className="w-full bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y"
                                >
                                    <div className="pt-[15px] px-[25px] pb-[25px]">
                                        <div className="flex justify-end">
                                            <div className="bg-[#F6F6F7] rounded-[20px] flex justify-center align-center px-[12px]">
                                                <p className="text-[#00153B] text-[12px] leading-[28px] font-bold">
                                                    Value
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[#00153B] text-[19px] leading-[24px] font-bold">
                                                Fast Start
                                            </p>
                                            <p className="text-[#00153B] text-[50px] leading-[63px] font-bold">
                                                $49
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                                                50 Credits per month
                                            </p>
                                            <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                                                Unlimited users
                                            </p>
                                        </div>
                                    </div>
                                    <div className="pt-[25px] px-[25px] pb-[35px]">
                                        <div>
                                            <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                                Direct Phone Numbers
                                            </p>
                                            <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                                Landline Phone Numbers
                                            </p>
                                            <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                                Corporate email addresses
                                            </p>
                                            <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                                Propsetcs
                                            </p>
                                            <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                                Chrome Extension
                                            </p>
                                        </div>
                                        <div className="mt-[25px]">
                                            <button className="bg-[#E1E3E5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold">
                                                Current Plan
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    key={3}
                                    className="w-full bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y"
                                >
                                    <div className="pt-[15px] px-[25px] pb-[25px]">
                                        <div className="flex justify-end">
                                            <div className="bg-[#F6F6F7] rounded-[20px] flex justify-center align-center px-[12px]">
                                                <p className="text-[#00153B] text-[12px] leading-[28px] font-bold">
                                                    Pro
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[#00153B] text-[19px] leading-[24px] font-bold">
                                                Accelerate
                                            </p>
                                            <p className="text-[#00153B] text-[50px] leading-[63px] font-bold">
                                                $89
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                                                100 Credits per month
                                            </p>
                                            <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                                                Unlimited users
                                            </p>
                                        </div>
                                    </div>
                                    <div className="pt-[25px] px-[25px] pb-[35px]">
                                        <div>
                                            <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                                Direct Phone Numbers
                                            </p>
                                            <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                                Landline Phone Numbers
                                            </p>
                                            <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                                Corporate email addresses
                                            </p>
                                            <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                                Propsetcs
                                            </p>
                                            <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                                Chrome Extension
                                            </p>
                                        </div>
                                        <div className="mt-[25px]">
                                            <button className="bg-[#006EF5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold">
                                                Upgrade +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                        : success && sessionId !== '' ? (
                            <SuccessDisplay sessionId={sessionId} />
                        )
                            : (
                                <p>{message}</p>
                            )
                }
            </div>
        </ReactModal>
    )
}