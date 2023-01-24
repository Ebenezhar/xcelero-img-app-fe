import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "../config/config"


// Post (create) multiple images along with user information(name,email,phone number,category) to server
export const postImages = createAsyncThunk('/postUser', async (values) => {
    try {
        const responseUser = await axios.post(`${config.api}/postimages`, values);
        if (responseUser.status === 200) {
            window.location.reload()
            return responseUser.data;
        } else {
            return []
        }
    } catch (error) {
        return error.response.data;
    }
})

//fetch all images from multiple documents inorder to diplay it to the user.
export const fetchAllImages = createAsyncThunk('/fetchallimages', async () => {
    try {
        const allImages = await axios.get(`${config.api}/fetchallimages`)
        if (allImages.status === 200) {
            let finalArray = [];
            allImages.data.map(e => {
                finalArray = finalArray.concat(...e.images)
            })
            return finalArray;
        }
    } catch (error) {
        return error.response.data;
    }
})

//Update the informations on the images
export const updateDetails = createAsyncThunk('/updatedetails', async (values) => {
    console.log(values);
    try {
        const response = await axios.post(`${config.api}/updatedetails`, values)
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        return error.response.data;
    }
})

//Delete the particular image with the help image name which should be unique.
export const deleteImage = createAsyncThunk('/deleteimage', async (fname) => {
    try {
        const response = await axios.delete(`${config.api}/deleteimage/${fname}`)
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        return error.response.data;
    }
})



const userSlice = createSlice({
    name: 'images',
    initialState: {
        status: 'idle',
        images: [],
        currentUser: ''
    },
    extraReducers(builders) {
        builders.addCase(postImages.pending, (state, action) => {
            state.status = 'loading';
        });
        builders.addCase(postImages.fulfilled, (state, action) => {
            state.status = 'success';
            if (action.payload.message) {
                alert(action.payload.message);
            }
        });
        builders.addCase(postImages.rejected, (state, action) => {
            state.status = 'failed';
            console.log(action.error);
        });
        builders.addCase(fetchAllImages.pending, (state, action) => {
            state.status = 'loading';
        });
        builders.addCase(fetchAllImages.fulfilled, (state, action) => {
            state.status = 'success';

            state.images = action.payload;
        });
        builders.addCase(fetchAllImages.rejected, (state, action) => {
            state.status = 'failed';
            console.log(action.error);
        });
        builders.addCase(deleteImage.pending, (state, action) => {
            state.status = 'loading';
        });
        builders.addCase(deleteImage.fulfilled, (state, action) => {
            state.status = 'success';
            if (action.payload.message) {
                alert(action.payload.message);
            }
        });
        builders.addCase(deleteImage.rejected, (state, action) => {
            state.status = 'failed';
            console.log(action.error);
        });
        builders.addCase(updateDetails.pending, (state, action) => {
            state.status = 'loading';
        });
        builders.addCase(updateDetails.fulfilled, (state, action) => {
            state.status = 'success';
            if (action.payload.message) {
                alert(action.payload.message);
            }
        });
        builders.addCase(updateDetails.rejected, (state, action) => {
            state.status = 'failed';
            console.log(action.error);
        });
    }
})
export default userSlice.reducer;