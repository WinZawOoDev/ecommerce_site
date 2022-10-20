import { useState, createContext } from "react";
import Main from "./components/Main";

export const AppContext = createContext(null);

function App() {
  
  const [UIView, setUIView] = useState({ gird: true, list: false });

  return (
    <AppContext.Provider value={{ UIView, setUIView }}>
      <Main />
    </AppContext.Provider>
  );
}

export default App;
