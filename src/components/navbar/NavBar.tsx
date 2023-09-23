import React from "react";
import { Link, useNavigate } from "react-router-dom";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PersonIcon from '@mui/icons-material/Person';
import "./Navbar.css";
import NavTab from "./components/NavTab";

import { toast } from "react-toastify";
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import { useAppDispatch } from "../../store/app/hooks";
import { deleteToken } from "../../store/features/auth/authSlice";
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
type Props = {};



const NavBar = (props: Props) => {

  const navList = [

    {
      name: "DashBoard",
      link: "/dashboard",
      icon: <GridViewRoundedIcon />
    },
    {
      name: "Invoice",
      link: "dashboard/invoices",
      icon: <DescriptionRoundedIcon />
    },
    {
      name: "Inventory",
      link: "dashboard/Inventory",
      icon: <InventoryRoundedIcon />
    },
    {
      name: 'Transactions',
      link: '/dashboard/Transactions',
      icon: <AccountBalanceWalletRoundedIcon />
    },
    {
      name:'Clients',
      link:'/dashboard/client',
      icon:<PersonIcon/>
    },
    {
      name: 'Employees',
      link: 'dashboard/employees',
      icon: <PersonIcon />
    },
    {
      name:'SpreadSheet',
      link:'/spreadsheet',
      icon:<FormatListNumberedIcon/>
    },


  ]

  const dispatch = useAppDispatch()
   const navigate = useNavigate()
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
          <div className="flex text-sm p-2 hover:bg-slate-100/10 gap-2 cursor-pointer" onClick={() => { dispatch(deleteToken()); sessionStorage.removeItem('token'); toast.info('Logout sucessfull') ;navigate('/login') }} >
            <div>{<LogoutRoundedIcon />}</div>
            {`Logout`}
          </div>
        </div>



        <div className="input  ">

          {
            navList.map((index) => {
              return (
                <>
                  <NavTab  name={index.name} icon={index.icon} link={index.link} key={index.name}  />

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
