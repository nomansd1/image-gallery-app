import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { createCheckOutSession, getSubscription, postSubscriptionSuccess } from "./subscriptionReducer"
const initialState = {
    subscriptions: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: null
}
export const authSlice = createSlice({
    name: "subscription",
    initialState,
    reducers: {
        clearState: () => initialState,
        clearData: state => {
            state.subscriptions = []
        }
    },
    extraReducers: builder => {
        builder.addCase(getSubscription.pending, state => {
            console.log(state,"getSubscription.pending");
            state.isLoading = true
            state.isError = false
            state.isSuccess = false
        })
        builder.addCase(getSubscription.fulfilled, (state, action) => {
            console.log(action,"getSubscription.fulfilled");
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.subscriptions = action.payload
        })
        builder.addCase(getSubscription.rejected, (state, action) => {
            console.log(action,"getSubscription.rejected");
            toast.error("Something went wrong", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.error = action.error
        })
        //CHECKOUT SESSION
        builder.addCase(createCheckOutSession.pending, state => {
            state.isLoading = true
            state.isError = false
            state.isSuccess = false
        })
        builder.addCase(createCheckOutSession.fulfilled, (state, action) => {
            console.log(action,"createCheckOutSession.fulfilled============");
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.subscriptions = action.payload
        })
        builder.addCase(createCheckOutSession.rejected, (state, action) => {
            console.log(action,"createCheckOutSession.rejected============");
            toast.error("Something went wrong", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.error = action.error
        })
        //PAYMENT SUCCESS
        builder.addCase(postSubscriptionSuccess.pending, state => {
            console.log(state,"postSubscriptionSuccess.pending============");
            state.isLoading = true
            state.isError = false
            state.isSuccess = false
        })
        builder.addCase(postSubscriptionSuccess.fulfilled, (state, action) => {
            console.log(action,"postSubscriptionSuccess.fulfilled============");
            toast.success("You have been subscribed", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            // state.subscriptions = action.payload
        })
        builder.addCase(postSubscriptionSuccess.rejected, (state, action) => {
            console.log(action,"postSubscriptionSuccess.rejected============");
            toast.error("Something went wrong", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.error = action.error
        })
    }
})
export const { clearState, clearData } = authSlice.actions
export default authSlice.reducer
