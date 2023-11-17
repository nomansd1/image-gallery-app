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
                return response
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response)
        }
    }
)
export const createCheckOutSession = createAsyncThunk(
    "subscription/createCheckOutSession",
    async (data, thunkAPI) => {
        console.log(data,'data');
        try {
            let response = await makeRequest(
                `${BASE_URL}/api/subscribe/create-checkout-session`,
                "POST",
                data,
                null
            )
            if (response) {
                console.log(response,"response");
                return response.result
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response)
        }
    }
)
export const postSubscriptionSuccess = createAsyncThunk(
    "subscription/postSubscriptionSuccess",
    async (data, thunkAPI) => {
        console.log(data,"data============");
        try {
            let response = await makeRequest(
                `${BASE_URL}/api/subscribe/payment-success`,
                "POST",
                data,
                null
            )
            if (response) {
                console.log(response,"response");
                return response
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response)
        }
    }
)