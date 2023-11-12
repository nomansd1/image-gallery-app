import { createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { makeRequest } from "@/utils/helper"
import { BASE_URL } from "@/config/api"
export const userlogin = createAsyncThunk(
  "auth/userlogin",
  async (data, thunkAPI) => {
    try {
      let response = await makeRequest(
        `${BASE_URL}/api/auth/login/`,
        "POST",
        data,
        null
      )
      if (response) {
        toast.success("Login has been successful!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        })
        return response.result
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response)
    }
  }
)
export const userSignUp = createAsyncThunk(
  "auth/userSignUp",
  async (data, thunkAPI) => {
    try {
      let response = await makeRequest(
        `${BASE_URL}/api/auth/signup/`,
        "POST",
        data,
        null
      )
      if (response) {
        toast.success("Sign Up has been successful!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        })
        return response.result
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response)
    }
  }
)