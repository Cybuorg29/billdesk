import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route,Routes} from 'react-router-dom'
import SignUp from './erp/pages/Signup'
import { ToastContainer } from 'react-toastify';
import Login from './erp/pages/Login';
import NotFound from './erp/pages/NotFound';
import Main from './erp/pages/Main';
import Dashboard from './erp/pages/erp/Dashboard';
import InvoiceFrontPage from './erp/pages/erp/invoice/InvoiceFrontPage';
import ViewInvoice from './erp/pages/erp/invoice/viewInvoice/ViewInvoice';
import { Counter } from './erp/store/sample';
import 'react-toastify/dist/ReactToastify.css';
import CreateInvoicePage from './erp/pages/erp/invoice/createInvoice/CreateInvoicePage';
import ClientDashboard from './erp/pages/erp/client/ClientDashboard';
import ViewProfile from './erp/pages/erp/profile/ViewProfile';
function App() {
  return (
    <>
    <ToastContainer/>
    <div className="App">
         <BrowserRouter>
        <Routes>
          <Route path='/register' element={<SignUp/>} ></Route>
          <Route path='/login' element={<Login/>} ></Route>
          <Route path='/' element={<Counter/>} ></Route>
          <Route path='/erp/' element={<Main/>} >
          <Route path='/erp/*' element={<NotFound/>} ></Route>
          <Route path='/erp/*' element={<NotFound/>} ></Route>
          <Route path='/erp/dashboard' element={<Dashboard/>} ></Route>
          <Route path='/erp/invoice' element={<InvoiceFrontPage/>} ></Route>
          <Route path='/erp/invoice/:invoiceid/view invoice' element={<ViewInvoice/>} ></Route>
          <Route path='/erp/invoice/createinvoice' element={<CreateInvoicePage/>} ></Route>
          <Route path='/erp/Client' element={<ClientDashboard/>} ></Route>
          <Route path='/erp/:name/view/profile' element={<ViewProfile/>} ></Route>
       
          </Route>
        </Routes>
         </BrowserRouter>
    </div>
    </>
  );
}

export default App;
