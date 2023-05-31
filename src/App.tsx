import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route,Routes} from 'react-router-dom'
import SignUp from './erp/pages/Signup'
import { ToastContainer } from 'react-toastify';
import Login from './erp/pages/Login';
import NotFound from './erp/pages/NotFound';
import Main from './erp/pages/Main';
import Dashboard from './erp/pages/erp/Dashboard';
import InvoiceFrontPage from './erp/pages/erp/invoice/InvoiceFrontPage';
import ViewInvoice from './erp/pages/erp/invoice/viewInvoice/ViewInvoice';
function App() {
  return (
    <>
    <ToastContainer/>
    <div className="App">
        <Routes>
          <Route path='/signup' element={<SignUp/>} ></Route>
          <Route path='/login' element={<Login/>} ></Route>
          <Route path='/erp/' element={<Main/>} >
          <Route path='/erp/:id/*' element={<NotFound/>} ></Route>
          <Route path='/erp/*' element={<NotFound/>} ></Route>
          <Route path='/erp/:id/dashboard' element={<Dashboard/>} ></Route>
          <Route path='/erp/:id/invoice' element={<InvoiceFrontPage/>} ></Route>
          <Route path='/erp/:id/invoice/:invoiceid/view invoice' element={<ViewInvoice/>} ></Route>
       
          </Route>
          
        </Routes>
    </div>
    </>
  );
}

export default App;
