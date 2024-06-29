import React,{ Component } from 'react';
import './App.css';

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import TaskForm from './components/TaskForm';

import TaskList from './components/TaskList';
import TaskEditor from './components/TaskEditor';
import TaskViewer from './components/TaskViewer';
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import CreateEmployee from "./components/CreateEmployee";
import RegisterComponent from "./components/RegisterComponent";
import Header from "./components/Header";
import {Footer} from "./components/Footer";
import LoginComponent from "./components/LoginComponent";
import {isUserLoggedIn} from "./services /AuthService";


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
        <Routes>
            <Route path='/' element={<LoginComponent/>}></Route>
            <Route path='/employees' element={
                <AuthenticatedRoute>
                <ListEmployeeComponent/>
                </AuthenticatedRoute>}>
            </Route>
            <Route path='/add-employee' element={
                <AuthenticatedRoute>
                <CreateEmployee/>
                </AuthenticatedRoute>}>
            </Route>
            <Route path='/update-employee/:id' element={<AuthenticatedRoute>
                <CreateEmployee/>
            </AuthenticatedRoute>}>
            </Route>
            <Route path='/register' element={<RegisterComponent/>}></Route>
            <Route path='/login' element={<LoginComponent/>}></Route>
        </Routes>
          <Footer></Footer>
      </BrowserRouter>
    
  )
}

export default App;
