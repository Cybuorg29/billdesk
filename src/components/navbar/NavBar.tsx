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

import { toast } from "react-toastify";
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import { useAppDispatch } from "../../store/app/hooks";
import { deleteToken } from "../../store/features/auth/authSlice";

type Props = {};



const NavBar = (props: Props) => {
 
   const navList = [
 
    {
      name:"DashBoard",
      link:"/dashboard",
      icon:<GridViewRoundedIcon />
    },
    {
      name:"Invoice",
      link:"/invoices",
      icon:<DescriptionRoundedIcon />
    },
    {
      name:"Inventory"  ,  
      link:"/Inventory"  ,
      icon:<InventoryRoundedIcon />
    },
    {
      name:'Incomes & Expences',
      link:'/tracker',
      icon:<AccountBalanceWalletRoundedIcon/>
    },
    {
      name:'clients',
      link:'/client',
      icon:<DescriptionRoundedIcon/>
    }
    
    
   ]

   const dispatch = useAppDispatch()
  return (
    <>
     <div className="relative h-full bg-navbar text-white " >

      <div className="border-b ">
        <div className="p-5 text-center text-2xl ">BillDesk</div>
      </div>
 <div className="absolute bottom-5 grid w-full "  >
 <NavTab 
          name="Settings"
          link="/settings"
          icon={<TuneRoundedIcon />}
          />
          <div  className="flex p-2 hover:bg-slate-100/10 gap-2 cursor-pointer" onClick={()=>{dispatch(deleteToken());sessionStorage.removeItem('token');toast.info('Logout sucessfull')}} >
        <div>{<LogoutRoundedIcon/>}</div>
       {`Logout`}
    </div>
 </div>
 
      
      
      <div className="input  ">
      
               {
                navList.map((index)=>{
                   return(
                    <>
                 <NavTab name={index.name} icon={index.icon} link={index.link}  key={index.name} />

                    </>
                   )
                })
               }

      </div>
          </div>
    </>
  );
};

export default NavBar;
