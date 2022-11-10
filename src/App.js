import { useState, createContext } from "react";
import { BrowserRouter } from 'react-router-dom'
import Main from "./components/Main";

export const AppContext = createContext(null);

function App() {

  const [UIView, setUIView] = useState({ grid: true, list: false });

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ UIView, setUIView }}>
        <Main />
      </AppContext.Provider>
    </BrowserRouter>

  );
}
export default App;
