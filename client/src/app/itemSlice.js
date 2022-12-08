import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    items: {},
    status: 'idle',
    error: null
}

export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
    const response = await axios.get('http://localhost:8000/v1/items');
    return response.data;
})

export const fetchItemById = createAsyncThunk('/items/fetchById', async itemId => {
    const response = await axios.get(`http://localhost:8000/v1/items/${itemId}`);
    return response.data;
})

const itemsSlice = createSlice({
    name: "items",
    initialState,
    extraReducers: {
        [fetchItems.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchItems.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.items = { ...state.items, ...action.payload };
        },
        [fetchItems.rejected]: (state, action) => {
            state.status = 'failed'
        }
    }
});


export default itemsSlice.reducer;

export const selectItems = state => state.items.items?.results;