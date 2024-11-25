import React,{ Component } from 'react';
import './App.css';

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import DashBoard from "./components/DashBoard";
import RegisterComponent from "./components/RegisterComponent";
import Header from "./components/Header";
import {Footer} from "./components/Footer";
import LoginComponent from "./components/LoginComponent";
import {isUserLoggedIn} from "./services/AuthService";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import LogoutComponent from "./components/LogoutComponent";
import ExcelUpload from "./components/ExcelUpload";


function App() {
 function AuthenticatedRoute({children}){
     const isAuth = isUserLoggedIn()
     console.log("Auth",isAuth)
     if (isAuth){
         return children
     }
     return <Navigate to='/login'/>
 }
  return (
      <BrowserRouter>
          <Header></Header>
          <ToastContainer />
        <Routes>
            <Route path='/' element={<ExcelUpload/>}></Route>
            <Route path='/dashboard' element={<AuthenticatedRoute><DashBoard/></AuthenticatedRoute>}>
            </Route>
            <Route path='/register' element={<RegisterComponent/>}></Route>
            <Route path='/login' element={<LoginComponent/>}></Route>
            <Route path='/logout' element={<LogoutComponent/>}></Route>
        </Routes>

      </BrowserRouter>
    
  )
}

export default App;
