import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ModalWindow from "./components/ModalWindow";
import CreateItem from "./components/CreateItem";
import MainPage from "./pages/MainPage";
import { userRoutes } from "./Routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";

function App() {
  const {token,ready,enter,out} = useAuth()
  const routes = userRoutes(!!token)
  if(!ready){
    return <Loader/>
  }
  console.log(token)
  return (
    <AuthContext.Provider value={{
      enter, out, token, ready
    }}>
      <Router>
        <Navbar/>
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
