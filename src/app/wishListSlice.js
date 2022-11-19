import { createSlice } from '@reduxjs/toolkit'

const whishListSlice = createSlice({
    name: "wishList",
    initialState: [],
    reducers: {
        addToWishList(state, action) {
            const { id, name } = action.payload;
            const index = state.findIndex(list => (list.id === id) && (list.name === name));
            if (index !== -1) {
                state.splice(index, 1);
            } else
                state.push({ id, name });
        }
    }
});


export const selectTotalWishList = ({ wishList }) => wishList.length;

export const selectCheckWhishList = ({ wishList }, { id, name }) => wishList.some(list => (list.id === id) && (list.name === name));

export const { addToWishList } = whishListSlice.actions;

export default whishListSlice.reducer;