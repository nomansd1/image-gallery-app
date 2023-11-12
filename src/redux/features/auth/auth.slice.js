import { createSlice } from "@reduxjs/toolkit"
import { logout, userSignUp, userlogin } from "./authReducer"
import { toast } from "react-toastify"
const initialState = {
  auth: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null
}
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearState: () => initialState,
    clearData: state => {
      state.auth = []
    }
  },
  extraReducers: builder => {
    builder.addCase(userlogin.pending, state => {
      state.isLoading = true
      state.isError = false
      state.isSuccess = false
    })
    builder.addCase(userlogin.fulfilled, (state, action) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = true
      state.auth = action.payload
    })
    builder.addCase(userlogin.rejected, (state, action) => {
      toast.error(action.payload.data.message, {
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

    builder.addCase(userSignUp.pending, state => {
      state.isLoading = true
      state.isError = false
      state.isSuccess = false
    })
    builder.addCase(userSignUp.fulfilled, (state, action) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = true
    })
    builder.addCase(userSignUp.rejected, (state, action) => {
      console.log(action);
      toast.error(action.payload.data.error || action.payload.data, {
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
