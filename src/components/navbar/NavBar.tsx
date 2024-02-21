import React, { useId } from "react";
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
import AddIcon from "../ui/icons/AddIcon";
import { MdSwitchAccount } from "react-icons/md";
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import { RiFolderReceivedLine } from "react-icons/ri";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
type Props = {};


interface Navtab {
  name: string,
  link: string
  icon: any
}


interface detailsTab {
  name: string,
  Tabs: Navtab[]
}


const NavBar = (props: Props) => {

  const navList = [

    {
      name: "DashBoard",
      link: "/dashboard",
      icon: <GridViewRoundedIcon />
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
      name: 'Clients',
      link: '/dashboard/client',
      icon: <PersonIcon />
    },
    {
      name: 'supplier',
      link: '/dashboard/supplier',
      icon: <PersonIcon />
    },
    {
      name: 'Accounts',
      link: '/accounts',
      icon: <MdSwitchAccount />
    },
    {
      name: 'Employees',
      link: 'dashboard/employees',
      icon: <PersonIcon />
    },
    // {
    //   name: 'SpreadSheet',
    //   link: '/spreadsheet',
    //   icon: <FormatListNumberedIcon />
    // },


  ]


  const navTabsWithDetails: detailsTab[] = [
    {
      name: 'P.O',
      Tabs: [
        {
          name: 'Create P.O',
          link: '/client',
          icon: <AddIcon onclick={() => { }} color="black" key={'P.O.1'} />
        }
      ]


    },
    {
      name: 'Bills',
      Tabs: [

        {
          name: 'Bills Receivable',
          icon: <RiFolderReceivedLine size={20} />,
          link: '/dashboard/invoice'
        },
        {
          name: 'Bills Payable',
          icon: <MdOutlineDriveFolderUpload size={20} />,
          link: '/dashboard/bills/payable'
        }
      ]
    }


  ]

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const LogoutIconKey = useId();
  const tuneIconKey = useId();
  return (
    <>
      <div className="relative h-full bg-navbar text-white " >

        <div className="border-b ">
          <div className="p-5 text-center text-2xl ">AudditX</div>
        </div>
        <div className="absolute bottom-5 grid w-full  "  >
          <NavTab
            name="Settings"
            link="/settings"
            icon={<TuneRoundedIcon key={tuneIconKey} />}
          />
          <div className="flex text-sm p-2 hover:bg-slate-100/10 gap-2 cursor-pointer" onClick={() => { dispatch(deleteToken()); sessionStorage.removeItem('token'); toast.info('Logout sucessfull'); navigate('/login') }} >
            <div>{<LogoutRoundedIcon key={LogoutIconKey} />}</div>
            {`Logout`}
          </div>
        </div>



        <div className="input  h-[75%]  overflow-auto">

          {
            navList.map((index) => {
              return (
                <>
                  <NavTab name={index.name} icon={index.icon} link={index.link} key={index.name} />

                </>
              )
            })
          }

          {
            navTabsWithDetails.map((index: detailsTab) => {
              return <>
                <details className=" duration-500" title={index.name} >
                  <summary className="hover:bg-[#21262C] rounded-lg p-2 pl-3  cursor-pointer    " >{index.name}</summary>
                  {
                    index.Tabs.map((item: Navtab) => {
                      return <>
                        <p className="p-2 flex  gap-2 hover:bg-[#21262C] rounded-lg  cursor-pointer" onClick={() => navigate(item.link)}>
                          <div className="grid place-content-center">{item.icon}</div>
                          <div className="grid place-content-center">{item.name}</div>
                        </p>
                      </>
                    })
                  }

                </details>
              </>
            })
          }

        </div>
      </div>
    </>
  );
};

export default NavBar;
