import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route,Routes} from 'react-router-dom'
import SignUp from './erp/pages/Signup'
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <div className="App">
        <ToastContainer/>
        <Routes>
          <Route path='/signup' element={<SignUp/>} ></Route>
        </Routes>
     

    </div>
  );
}

export default App;
