import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Login from './pages/user/login/Login';
import SignUp from './pages/user/signup/signup';
import 'react-toastify/dist/ReactToastify.css';
import Main from './pages/mainlayout/Main';
import ForgotPassword from './pages/user/forgot/ForgotPassword';
import ClientMain from './pages/client/main/ClientMain';
import Settings from './pages/settings/Settings';
import NotFound from './pages/NotFound/NotFound';
import TrackerDashboard from './pages/incomeAndExpences/Dashboard/IncAndExpDashboard';
import { isBrowser } from 'react-device-detect'
import MobileMain from './pages/mainlayout/mobile/MobileMain';
import TrackerMobileDashboard from './pages/incomeAndExpences/Dashboard/mobile/TrackerMobileDashboard';
import ViewIncome from './pages/incomeAndExpences/viewIncome/ViewIncome';
import ViewExpences from './pages/incomeAndExpences/viewExpences/ViewExpences';
import CreateExpence from './pages/incomeAndExpences/createExpence/CreateExpence';
import Dashboard from './pages/Dashboard/Dashboard';
import IncAndExpDashboard from './pages/incomeAndExpences/Dashboard/IncAndExpDashboard';
import { sortByDate } from './utils/SortDates';
import Loader from './Loaders/Loader';
import EmployeeDashboard from './pages/employee/Dashboard/EmployeeDashboard';
import AddEmployee from './pages/employee/crud/AddEmployee';
import SpreadSheet from './pages/spreadsheet/SpreadSheet';
import {registerLicense} from '@syncfusion/ej2-base'
import EditEmployee from './pages/employee/crud/EditEmployee';
import InventoryDashboard from './pages/inventory/InventoryDashboard';
import AddProducts from './pages/inventory/view/AddProducts';
registerLicense("Ngo9BigBOggjHTQxAR8/V1NGaF5cXmdCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdgWXhfeHVUQ2hfWUJ0VkE=");
function App() {


  if (!isBrowser) {
    return <>

      <ToastContainer />
      <div className=" ">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<MobileMain />}>
              <Route path='/*' element={<NotFound />}></Route>
              <Route path='/signup' element={<SignUp />} />
              <Route path='/login' element={<Login />} />
              <Route path='/tracker' element={<TrackerMobileDashboard />}></Route>

            </Route>

          </Routes>
        </BrowserRouter>
      </div>
    </>
  } else {
    return (
      <>
        <ToastContainer />
        <Loader />
        <div className=" font-ubuntu scrollbar ">
          <BrowserRouter>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/forgot/generate' element={<ForgotPassword />} />
              <Route path='/' element={<Main />}>
                <Route path='/' element={<Dashboard />}></Route>
                <Route path='/dashboard' element={< Dashboard />}></Route>
                <Route path='/client' element={<ClientMain />}></Route>
                <Route path='/settings' element={<Settings />}></Route>
                <Route path='/*' element={<NotFound />}></Route>
                <Route path='/dashboard/income and expence' element={<IncAndExpDashboard />}></Route>
                <Route path='/view/:sort/income' element={<ViewIncome />}></Route>
                <Route path='/view/:sort/:limit/expences' element={<ViewExpences />}></Route>
                <Route path='/create/:type/expence' element={<CreateExpence />}></Route>
                <Route path='/dashboard/employees' element={<EmployeeDashboard />}></Route>
                <Route path='/create/employee' element={<AddEmployee />}></Route>
                <Route path='/edit/:id/employee' element={<EditEmployee />}></Route>
                <Route path='/spreadsheet' element={<SpreadSheet/>} ></Route>
                <Route path='/dashboard/inventory'  element={<InventoryDashboard/>}   />
                <Route path='/create/product'  element={<AddProducts/>}   />
              </Route>

            </Routes>
          </BrowserRouter>
        </div>
      </>
    );
  }


}

export default App;
