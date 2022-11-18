import { useState, createContext } from "react";
import { useImmer } from 'use-immer'
import { BrowserRouter } from 'react-router-dom'
import Main from "./components/Main";

export const AppContext = createContext(null);

function App() {

  const [UIView, setUIView] = useState({ grid: true, list: false });
  const changeUIView = ({ grid, list }) => setUIView(prev => ({ ...prev, grid, list }));

  const [cart, setCart] = useImmer([]);

  const totalCart = () => cart.length;

  const totalCartQty = () => cart.reduce((accumulator, currentValue) => accumulator + currentValue.qty, 0)

  const addToCart = ({ id, name, qty }) => setCart(prev => {
    const index = findArrObjIndex({ id, name }, prev);
    if (notNegaNumb(index))
      prev[index].qty = prev[index].qty + qty;
    else
      prev.push({ id, name, qty });
  });

  const increCartQty = ({ id, name }) => setCart(prev => {
    const index = findArrObjIndex({ id, name }, prev);
    if (notNegaNumb(index))
      prev[index].qty++;
  });

  const decreCartQty = ({ id, name }) => setCart(prev => {
    const index = findArrObjIndex({ id, name }, prev);
    if ((notNegaNumb(index)) && (prev[index].qty !== 0))
      prev[index].qty--;
  });


  const deleteCart = ({ id, name }) => setCart(prev => {
    const index = findArrObjIndex({ id, name }, prev);
    if (notNegaNumb(index)) prev.splice(index, 1);
  })

  const [wishList, setWishList] = useImmer([]);
  const checkWishList = ({ id, name }) => wishList.some(list => (list.id === id) && (list.name === name));
  const totalWishlist = () => wishList.length;
  const addToWishList = ({ id, name }) => setWishList(prev => {
    const index = findArrObjIndex({ id, name }, prev);
    if (notNegaNumb(index))
      prev.splice(index, 1);
    else
      prev.push({ id, name });
  });


  const findArrObjIndex = ({ id, name }, arr) => arr.findIndex(list => (list.id === id) && (list.name === name));
  const notNegaNumb = numb => numb !== -1;

  const appProvider = { UIView, changeUIView, checkWishList, totalWishlist, addToWishList, cart, totalCart, totalCartQty, addToCart, increCartQty, decreCartQty, deleteCart }

  return (
    <BrowserRouter>
      <AppContext.Provider value={appProvider}>
        <Main />
      </AppContext.Provider>
    </BrowserRouter>

  );
}
export default App;
