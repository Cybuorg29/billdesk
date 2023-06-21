import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route,Routes} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Login from './pages/user/login/Login';
import SignUp from './pages/user/signup/signup';
import 'react-toastify/dist/ReactToastify.css';
import Main from './pages/mainlayout/Main';
import ForgotPassword from './pages/user/forgot/ForgotPassword';
import ClientView from './pages/client/view/ClientView';
import ClientMain from './pages/client/main/ClientMain';
import Settings from './pages/settings/Settings';
import NotFound from './pages/NotFound/NotFound';
import TrackerDashboard from './pages/client/Tracker/TrackerDashboard';
import {isMobile} from 'react-device-detect'
import MobileMain from './pages/mainlayout/mobile/MobileMain';
function App() {
 
     if(isMobile){
       return<>

       <ToastContainer/>
         <div className="">
             <BrowserRouter>
            <Routes>
               <Route path='/login' element={<Login/>}/>
               <Route path='/signup' element={<SignUp/>}/>
               <Route path='/' element={<MobileMain/>}>
                  
               </Route>
               {/* <Route path='/forgot/generate' element={<ForgotPassword/>}/>
               <Route path='/client' element={<ClientMain/>}></Route>
               <Route path='/settings' element={<Settings/>}></Route>
               <Route path='/*' element={<NotFound/>}></Route>
               <Route path='/tracker' element={<TrackerDashboard/>}></Route>
               </Route> */}
         
            </Routes>
             </BrowserRouter>
        </div>
      </>
     }else{
      return (
        <>
        <ToastContainer/>
        <div className="">
             <BrowserRouter>
            <Routes>
               <Route path='/login' element={<Login/>}/>
               <Route path='/signup' element={<SignUp/>}/>
               <Route path='/forgot/generate' element={<ForgotPassword/>}/>
               <Route path='/' element={<Main/>}>
               <Route path='/client' element={<ClientMain/>}></Route>
               <Route path='/settings' element={<Settings/>}></Route>
               <Route path='/*' element={<NotFound/>}></Route>
               <Route path='/tracker' element={<TrackerDashboard/>}></Route>
               </Route>
         
            </Routes>
             </BrowserRouter>
        </div>
        </>
      );
     }

    // return (
    //       <>
    //       <ToastContainer/>
    //       <div className="">
    //            <BrowserRouter>
    //           <Routes>
    //              <Route path='/login' element={<Login/>}/>
    //              <Route path='/signup' element={<SignUp/>}/>
    //              <Route path='/forgot/generate' element={<ForgotPassword/>}/>
    //              <Route path='/' element={<Main/>}>
    //              <Route path='/client' element={<ClientMain/>}></Route>
    //              <Route path='/settings' element={<Settings/>}></Route>
    //              <Route path='/*' element={<NotFound/>}></Route>
    //              <Route path='/tracker' element={<TrackerDashboard/>}></Route>
    //              </Route>
    //              {/* <Route  path='/mobile/main' element={<MobileMain/>} ></Route> */}
           
    //           </Routes>
    //            </BrowserRouter>
    //       </div>
    //       </>
    //     );
   

}

export default App;
