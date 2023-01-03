import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


const initialState = {
    categorys: [],
    status: 'idle',
    error: null
}

export const fetchCategorys = createAsyncThunk('categorys/fetchCategorys', async () => {
    const response = await axios.get('http://localhost:8000/v1/categorys');
    // console.log(response.data);
    return response.data;
})


export const fetchProductCategorys = createAsyncThunk('categorys/fetchProductCategorys', async () => {
    const response = await axios.get('http://localhost:8000/v1/categorys/product');
    return response.data;
});


const categorySlice = createSlice({
    name: "categorys",
    initialState,
    extraReducers: {
        [fetchCategorys.pending]: (state, action) => {
            state.status = 'loading';
            // console.log("pending");
        },
        [fetchCategorys.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            // console.log("fulFilled");
            state.categorys = state.categorys.concat(action.payload);
        },
        [fetchCategorys.rejected]: (state, action) => {
            state.status = 'failed';
            // console.log('rejected');
        }
    }
});


export default categorySlice.reducer;

export const selectCategorys = state => state.categorys.categorys

export const selectMainCategory = state => state.categorys.categorys.map(category => ({ id: category.id, name: category.name, unavailable: category.unavailable }));