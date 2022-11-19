import { useState, createContext } from "react";
import { BrowserRouter } from 'react-router-dom'
import Main from "./components/Main";

export const AppContext = createContext(null);

function App() {

  const [UIView, setUIView] = useState({ grid: true, list: false });
  const changeUIView = ({ grid, list }) => setUIView(prev => ({ ...prev, grid, list }));


  const appProvider = { UIView, changeUIView }

  return (
    <BrowserRouter>
      <AppContext.Provider value={appProvider}>
        <Main />
      </AppContext.Provider>
    </BrowserRouter>

  );
}
export default App;
