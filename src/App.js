import Header from "./components/Header";
import Cards from "./components/Cards";
import { Route, Routes } from "react-router-dom";
import Addmovie from "./components/Addmovie";
import Details from "./components/Details";
import { createContext } from "react";
import { useState } from "react";
import Signin from './components/Signin';
import Signup from "./components/Signup";

const AppState = createContext();

function App() {
  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");

  return (
    <AppState.Provider value={{ login, userName, setLogin, setUserName }}>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<Cards />} />
          <Route path="/addmovie" element={<Addmovie />} />
          <Route path="/detail/:id" element={<Details />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </AppState.Provider>
  );
}

export default App;
export { AppState };
