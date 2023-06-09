import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route,Routes} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
    <ToastContainer/>
    <div className="App">
         <BrowserRouter>
        <Routes>
     
        </Routes>
         </BrowserRouter>
    </div>
    </>
  );
}

export default App;
