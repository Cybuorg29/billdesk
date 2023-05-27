import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route,Routes} from 'react-router-dom'
import SignUp from './erp/pages/Signup'
import { ToastContainer } from 'react-toastify';
import Login from './erp/pages/Login';
import NotFound from './erp/pages/NotFound';
import Main from './erp/pages/Main';
function App() {
  return (
    <>
    <ToastContainer/>
    <div className="App">
        <Routes>
          <Route path='/signup' element={<SignUp/>} ></Route>
          <Route path='/login' element={<Login/>} ></Route>
          <Route path='/' element={<Main/>} ></Route>
          <Route path='*' element={<NotFound/>} ></Route>
        </Routes>
    </div>
    </>
  );
}

export default App;
