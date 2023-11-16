import { createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { makeRequest } from "@/utils/helper"
import { BASE_URL } from "@/config/api"
export const getSubscription = createAsyncThunk(
    "subscription/getSubscription",
    async (id, thunkAPI) => {
        try {
            let response = await makeRequest(
                `${BASE_URL}/api/subscribe/get-subscription-by-userId/${id}`,
                "GET",
                null,
                null
            )
            if (response) {
                return response.updatedSubscription
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response)
        }
    }
)
export const postSubscriptionSuccess = createAsyncThunk(
    "subscription/postSubscriptionSuccess",
    async (data, thunkAPI) => {
        try {
            let response = await makeRequest(
                `${BASE_URL}/api/subscribe/payment-success/`,
                "POST",
                data,
                null
            )
            if (response) {
                return response.updatedSubscription
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response)
        }
    }
)