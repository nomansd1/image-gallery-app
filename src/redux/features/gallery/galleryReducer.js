import { createAsyncThunk } from "@reduxjs/toolkit"
import { makeRequest } from "@/utils/helper"
import { BASE_URL } from "@/config/api"
export const getImagesByCategory = createAsyncThunk(
    "imageGallery/getImagesByCategory",
    async (category, thunkAPI) => {
        try {
            let response = await makeRequest(
                `${BASE_URL}/api/getimage-bycategory/${category}`,
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