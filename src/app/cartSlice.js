import { createSlice } from '@reduxjs/toolkit'
import { products } from '../dummyData/Products';

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addToCart(state, action) {
            const { id, name, qty } = action.payload;
            const cartExist = state.find(cart => (cart.id === id) && (cart.name === name));
            if (cartExist)
                cartExist.qty = cartExist.qty + qty;
            else
                state.push({ id, name, qty });
        },
        increCartQty(state, action) {
            const { id, name } = action.payload;
            const cartExist = state.find(cart => (cart.id === id) && (cart.name === name));
            if (cartExist) cartExist.qty++;
        },
        decreCartQty(state, action) {
            const { id, name } = action.payload;
            const index = state.findIndex(list => (list.id === id) && (list.name === name));
            if (index !== -1) {
                if (state[index].qty === 1)
                    state.splice(index, 1);
                else
                    state[index].qty--;
            }

        },
        deleteCart(state, action) {
            const { id, name } = action.payload;
            const index = state.findIndex(list => (list.id === id) && (list.name === name));
            if (index !== -1)
                state.splice(index, 1);
        }
    }
})

export const selectTotalCart = ({ cart }) => cart.length;

export const selectIsCartEmpty = ({ cart }) => cart.length === 0;

export const selectTotalCartQty = ({ cart }) => cart.reduce((accumulator, currentValue) => accumulator + currentValue.qty, 0);

export const selectProductFromCart = ({ cart }) => {
    let arr = [];
    let subTotalPrice = 0;
    cart.forEach((c) => {
        products.forEach(product => {
            if ((c.id === product.id) && (c.name === product.name)) {
                let totalPrice = c.qty * product.price;
                arr.push({
                    id: product.id,
                    name: product.name,
                    productDetail: {
                        img: product.images[0].src,
                        desc: product.description,
                        brand: product.brand,
                        stock: 5
                    },
                    quantity: c.qty,
                    price: product.price,
                    totalPrice
                });
                subTotalPrice += totalPrice;
            }
        })
    })

    return {
        items: arr,
        ordSummary: [
            { id: 1, name: "Subtotal", value: subTotalPrice, currency: "MMK" },
            { id: 2, name: "Estimated shipping fee", value: 40000, currency: "MMK" },
            { id: 3, name: "Estimated tax fee", value: 3000, currency: "MMK" }
        ]
    };
}




export const { addToCart, increCartQty, decreCartQty, deleteCart } = cartSlice.actions;


export default cartSlice.reducer;