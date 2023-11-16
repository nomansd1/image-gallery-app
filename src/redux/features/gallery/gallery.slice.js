import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { getImagesByCategory, postImagesByCategory } from "./galleryReducer"
const initialState = {
    images: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: null
}
export const imageGallerySlice = createSlice({
    name: "imageGallery",
    initialState,
    reducers: {
        clearState: () => initialState,
        clearData: state => {
            state.subscriptions = []
        }
    },
    extraReducers: builder => {
        builder.addCase(getImagesByCategory.pending, state => {
            state.isLoading = true
            state.isError = false
            state.isSuccess = false
        })
        builder.addCase(getImagesByCategory.fulfilled, (state, action) => {
            console.log(action, "getImagesByCategory.fulfilled=====");
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.images = action.payload
        })
        builder.addCase(getImagesByCategory.rejected, (state, action) => {
            console.log(action, "getImagesByCategory.rejected=====");
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
        // POST DATA
        builder.addCase(postImagesByCategory.pending, state => {
            state.isLoading = true
            state.isError = false
            state.isSuccess = false
        })
        builder.addCase(postImagesByCategory.fulfilled, (state, action) => {
            console.log(action, "postImagesByCategory.fulfilled=====");
            toast.success("Upload Successfully", {
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
            state.images.unshift(action.payload)
        })
        builder.addCase(postImagesByCategory.rejected, (state, action) => {
            console.log(action, "postImagesByCategory.rejected=====");
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
export const { clearState, clearData } = imageGallerySlice.actions
export default imageGallerySlice.reducer
