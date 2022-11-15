import { useState, createContext } from "react";
import { useImmer } from 'use-immer'
import { BrowserRouter } from 'react-router-dom'
import Main from "./components/Main";

export const AppContext = createContext(null);

function App() {

  const [UIView, setUIView] = useState({ grid: true, list: false });
  const changeUIView = ({ grid, list }) => setUIView(prev => ({ ...prev, grid, list }));

  const [cart, setCart] = useImmer([]);
  const totalCartQty = () => {
    let total;
    if (cart.length === 0)
      total = cart.length;
    else
      total = cart.reduce((prev, current) => {
        if (prev.qty)
          return prev.qty + current.qty;
        else
          return current.qty;
      }, 0);
    return total;
  }

  const addToCart = ({ id, name, qty }) => setCart(prev => {
    const index = prev.findIndex(list => (list.id === id) && (list.name === name));
    if (index !== -1)
      prev[index].qty = prev[index].qty + qty;
    else
      prev.push({ id, name, qty });
  });


  const [wishList, setWishList] = useImmer([]);
  const checkWishList = ({ id, name }) => wishList.some(list => (list.id === id) && (list.name === name));
  const totalWishlist = () => wishList.length;
  const addToWishList = ({ id, name }) => setWishList(prev => {
    const index = prev.findIndex(list => (list.id === id) && (list.name === name));
    if (index)
      prev.push({ id, name });
    else
      if (index !== -1) prev.splice(index, 1);
  });


  const appProvider = { UIView, changeUIView, checkWishList, totalWishlist, addToWishList, totalCartQty, addToCart }

  return (
    <BrowserRouter>
      <AppContext.Provider value={appProvider}>
        <Main />
      </AppContext.Provider>
    </BrowserRouter>

  );
}
export default App;
