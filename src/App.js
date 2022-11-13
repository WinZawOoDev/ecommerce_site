import { useState, createContext } from "react";
import {useImmer} from 'use-immer'
import { BrowserRouter } from 'react-router-dom'
import Main from "./components/Main";

export const AppContext = createContext(null);

function App() {

  const [UIView, setUIView] = useState({ grid: true, list: false });
  const [wishList, setWishList] = useImmer([]);

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ UIView, setUIView, wishList, setWishList }}>
        <Main />
      </AppContext.Provider>
    </BrowserRouter>

  );
}
export default App;
