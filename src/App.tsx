import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Login from './pages/user/login/Login';
import SignUp from './pages/user/signup/signup';
import 'react-toastify/dist/ReactToastify.css';
import Main from './pages/mainlayout/Main';
import ForgotPassword from './pages/user/forgot/ForgotPassword';
import Settings from './pages/settings/Settings';
import NotFound from './pages/NotFound/NotFound';
import { isBrowser } from 'react-device-detect'
import MobileMain from './pages/mainlayout/mobile/MobileMain';
import TrackerMobileDashboard from './pages/incomeAndExpences/Dashboard/mobile/TrackerMobileDashboard';
import ViewIncome from './pages/incomeAndExpences/viewIncome/ViewIncome';
import ViewExpences from './pages/incomeAndExpences/viewExpences/ViewExpences';
import CreateExpence from './pages/incomeAndExpences/createExpence/CreateExpence';
import Dashboard from './pages/Dashboard/Dashboard';
import IncAndExpDashboard from './pages/incomeAndExpences/Dashboard/IncAndExpDashboard';
import Loader from './Loaders/Loader';
import EmployeeDashboard from './pages/employee/Dashboard/EmployeeDashboard';
import AddEmployee from './pages/employee/crud/AddEmployee';
import SpreadSheet from './pages/spreadsheet/SpreadSheet';
import EditEmployee from './pages/employee/crud/EditEmployee';
import InventoryDashboard from './pages/inventory/dashboard/InventoryDashboard';
import AddProducts from './pages/inventory/create/AddProducts';
import ViewProduct from './pages/inventory/view/ViewProduct';
import ClientDashboard from './pages/Client/Dashboard/ClientDashboard';
import AddBusiness from './pages/Client/Add/AddBusiness';
import ViewProfile from './pages/user/view/ViewProfile';
import SearchUserPage from './pages/user/search/SearchUserPage';
import { registerLicense } from '@syncfusion/ej2-base'
import InsertDummyData from './pages/dummyData/Insert';
import SupplierDashboard from './pages/supplier/dashboard/page';
import InvoiceDashboard from './pages/invoice/dashboard/page';
import CreateInvoice from './pages/invoice/create/Page';
import CreateIncome from './pages/income/create/page';
import ViewInvoice from './pages/invoice/view/Page';
import ClaimProfile from './pages/user/claim/profile/page';
import Accounts from './pages/accounts/page';
import ViewAccount from './pages/accounts/view/page';
import PayableDashboard from './pages/bills/payable/dashboard/page';
import CheckState from './pages/bills/payable/checkState';
import ViewBillsPayable from './pages/bills/payable/view/page';
import CreateBillsPayable from './pages/bills/payable/create/page';
import PurchaseOrderDashboard from './pages/purchaseOrder/dashboard/Page';
import CreatePurchaseOrder from './pages/purchaseOrder/Create/Page';
import CheckPoState from './pages/purchaseOrder/CheckState'
import { elements } from 'chart.js';
import ViewPurchaseOrder from './pages/purchaseOrder/view/Page';
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
        <div className=" font-rubik scrollbar " id='app'>
          <BrowserRouter>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/claim/profile/:id' element={<ClaimProfile />} />
              <Route path='/forgot/generate' element={<ForgotPassword />} />
              <Route path='/' element={<Main />}>
                <Route path='/' element={<Dashboard />}></Route>
                <Route path='/dashboard' element={< Dashboard />}></Route>
                <Route path='/settings' element={<Settings />}></Route>
                <Route path='/*' element={<NotFound />}></Route>
                <Route path='/dashboard/Transactions' element={<IncAndExpDashboard />}></Route>
                <Route path='/view/:sort/income' element={<ViewIncome />}></Route>
                <Route path='/view/:sort/:limit/expences' element={<ViewExpences />}></Route>
                <Route path='/create/:type/expence' element={<CreateExpence />}></Route>
                <Route path='/dashboard/employees' element={<EmployeeDashboard />}></Route>
                <Route path='/create/employee' element={<AddEmployee />}></Route>
                <Route path='/edit/:id/employee' element={<EditEmployee />}></Route>
                <Route path='/spreadsheet' element={<SpreadSheet />} ></Route>
                <Route path='/dashboard/inventory' element={<InventoryDashboard />} />
                <Route path='/create/product' element={<AddProducts />} />
                <Route path='/user/view/:id/product' element={<ViewProduct />} />
                <Route path='/dashboard/client' element={<ClientDashboard />} />
                <Route path='/create/connection' element={<AddBusiness />} />
                <Route path='/view/:id/profile' element={<ViewProfile />} />
                <Route path='/search/user' element={<SearchUserPage />} />
                <Route path='/insert/dummy' element={<InsertDummyData />} />
                <Route path='/dashboard/supplier' element={<SupplierDashboard />} />
                <Route path='/dashboard/invoice' element={<InvoiceDashboard />} />
                <Route path='/create/invoice' element={<CreateInvoice />} />
                <Route path='/create/income' element={<CreateIncome />} />
                <Route path='/create/:type/income' element={<CreateIncome />} />
                <Route path='/view/:id/invoice' element={<ViewInvoice />} />
                <Route path='/accounts' element={<Accounts />} />
                <Route path='/view/:id/account' element={<ViewAccount />} />
                <Route path='/dashboard/bills/payable' element={<CheckState children={<PayableDashboard />} key={'DashboardPayables'} />} />
                <Route path='/view/bills/:id/payable' element={<CheckState children={<ViewBillsPayable />} key={'viewPayables'} />} />
                <Route path='/create/billspayable' element={<CreateBillsPayable />} />
                <Route path='/dashboard/purchase order' element={<CheckPoState children={<PurchaseOrderDashboard />} />} />
                <Route path='/create/purchase order' element={<CheckPoState children={<CreatePurchaseOrder />} />} />
                <Route path='/purchase order/:_id/view' element={<CheckPoState children={<ViewPurchaseOrder />} />} />
              </Route>

            </Routes>
          </BrowserRouter>
        </div>
      </>
    );
  }


}

export default App;
