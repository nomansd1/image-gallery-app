import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { getSubscription, postSubscriptionSuccess } from "./subscriptionReducer"
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
            state.isLoading = true
            state.isError = false
            state.isSuccess = false
        })
        builder.addCase(getSubscription.fulfilled, (state, action) => {
            console.log(action.payload, "getSubscription.fulfilled=====");
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.subscriptions = action.payload
        })
        builder.addCase(getSubscription.rejected, (state, action) => {
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

        builder.addCase(postSubscriptionSuccess.pending, state => {
            state.isLoading = true
            state.isError = false
            state.isSuccess = false
        })
        builder.addCase(postSubscriptionSuccess.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.subscriptions = action.payload
        })
        builder.addCase(postSubscriptionSuccess.rejected, (state, action) => {
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
