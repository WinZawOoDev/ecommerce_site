import { useState, createContext } from "react";
import Main from "./components/Main";

export const AppContext = createContext(null);

function App() {

  const [UIView, setUIView] = useState({ grid: true, list: false });
  const changeUIView = ({ grid, list }) => setUIView(prev => ({ ...prev, grid, list }));

  const [showSignUp, setShowSignUp] = useState(false);
  const closeSignUp = () => setShowSignUp(false);
  const openSignUp = () => setShowSignUp(true);

  const [showSignIn, setShowSignIn] = useState(true);
  const closeSignIn = () => setShowSignIn(false);
  const openSignIn = () => setShowSignIn(true);



  const appProvider = { UIView, changeUIView, showSignUp, openSignUp, closeSignUp, showSignIn, closeSignIn, openSignIn }

  return (
    <AppContext.Provider value={appProvider}>
      <Main />
    </AppContext.Provider>
  );
}
export default App;
