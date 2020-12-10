import React from "react";
import './App.css';
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";

import { BrowserRouter, Route } from "react-router-dom";
import {AuthProvider} from "./components/Auth/Auth";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Route path='/register' exact component={RegisterPage}/>
        <Route path='/login' exact component={LoginPage}/>
        <Route path='/' exact component={MainPage}/>
      </BrowserRouter>
    </AuthProvider>

  );
}

export default App;
