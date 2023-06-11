import React from "react";
import { Link } from "react-router-dom";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import "./Navbar.css";
import NavTab from "./components/NavTab";
import { useAppDispatch } from "../store/app/hooks";
import { deleteToken } from "../store/features/auth/authSlice";
import { toast } from "react-toastify";
type Props = {};

// const NavBar = (props: Props) => {

//   return (
//     <div  classNameName='w-full h-full   relative ' >
//       {/* name BillDesk */}

//       <div  classNameName='grid justify-items-center items-center  p-5 '>
//         <div  classNameName=' text-2xl text-white ' >BillDesk</div>

//       </div>
//       {/* <div  classNameName='grid justify-items-center items-center  p-5 border-b '>
//         <div  classNameName=' text-lg text-white ' >{'Diya Industries pvt ltd'}</div>

//       </div> */}

//       {/* tabs */}
//       <div classNameName='grid items-center justify-items-start  px-2 my-3 gap-5  text-white   ' >
//        <NavTab name='DashBoard' link='/dashboard' icon={<GridViewRoundedIcon  />} />
//        <NavTab name='Invoice' link='/invoices'    icon={<DescriptionRoundedIcon/>}  />
//        <NavTab name='Inventory' link='/Inventory' icon={<InventoryRoundedIcon/>} />
//        <NavTab name='Clients' link='/client' icon={<InventoryRoundedIcon/>} />
//       </div>
//       <div classNameName='absolute bottom-3 w-full grid gap-5 ' >
//       {/* {NavigationButtons()} */}
//        <NavTab name='settings' link='/settings' icon={<TuneRoundedIcon/>} />
//        <div  classNameName='w-full cursor-pointer text-white'>
//         <div classNameName='text-lg hover:bg-white/20 w-full p-2  rounded-md cursor-pointer flex gap-2 '>
//             <span classNameName='text-white' ><LogoutRoundedIcon/></span><span>Logout</span>

//         </div>
//       </div>

//       </div>

//     </div>
//   )

//   function NavigationButtons() {
//     return <div classNameName='grid justify-items-center grid-cols-2   '>
//       <div classNameName=' text-white cursor-pointer ' onClick={() => window.history.back()}><ArrowBackRoundedIcon /></div>
//       <div classNameName=' text-white cursor-pointer ' onClick={() => window.history.forward()}><ArrowForwardRoundedIcon /></div>

//     </div>;
//   }
// }

// export default NavBar

const NavBar = (props: Props) => {
   const dispatch = useAppDispatch()
  return (
    <>
      <div className="border-b relative">
        <div className="p-5 text-center text-2xl text-white">BillDesk</div>
      </div>
 <div className="absolute bottom-5 grid"  >
 <NavTab
          name="Settings"
          link="/settings"
          icon={<TuneRoundedIcon />}
        />
          <div  className="value" onClick={()=>{dispatch(deleteToken());sessionStorage.removeItem('token');toast.info('Logout sucessfull')}} >
        <div>{<LogoutRoundedIcon/>}</div>
       {`Logout`}
    </div>
 </div>
 
      
      
      <div className="input  bg-navbar">
        <NavTab
          name="DashBoard"
          link="/dashboard"
          icon={<GridViewRoundedIcon />}
        />
        <NavTab
          name="Invoice"
          link="/invoices"
          icon={<DescriptionRoundedIcon />}
        />
        <NavTab
          name="Inventory"
          link="/Inventory"
          icon={<InventoryRoundedIcon />}
        />
        <NavTab name="Clients" link="/client" icon={<InventoryRoundedIcon />} />
      </div>
    </>
  );
};

export default NavBar;
