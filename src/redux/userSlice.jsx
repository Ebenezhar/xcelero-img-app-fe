import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "../config/config"

export const postImages = createAsyncThunk('/postUser', async (values) => {
    try {
        const responseUser = await axios.post(`${config.api}/postimages`, values);
        console.log(responseUser);
        if (responseUser.status === 200) {
            // window.location.reload()
            return responseUser.data;
        } else {
            return []
        }
    } catch (error) {
        return error.response.data;
    }
})

export const fetchAllImages = createAsyncThunk('/fetchallimages', async () => {
    try {
        const allImages = await axios.get(`${config.api}/fetchallimages`)
        console.log(allImages.data);
        if (allImages.status === 200) {
            let finalArray = [];
            allImages.data.map(e => {
                finalArray = finalArray.concat(...e.images)
            })

            console.log(finalArray);
            return finalArray;
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
            console.log(action.payload);
            state.images = action.payload;
        });
        builders.addCase(fetchAllImages.rejected, (state, action) => {
            state.status = 'failed';
            console.log(action.error);
        });
    }
})
export default userSlice.reducer;