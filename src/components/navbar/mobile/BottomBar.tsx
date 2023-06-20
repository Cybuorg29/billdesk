import React, { useState } from 'react'
import NavTab from './components/NavTab'
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import SideBar from './components/SideBar';
type Props = {}

const BottomBar = (props: Props) => {
    const [sideBarScale,setSideBarScale] = useState('scale-0')

 
     const navLine = [
        {
            name:'Dashboard',
            icon:<GridViewRoundedIcon/>,
            link:'/dashboard'
        },
        {
            name:"Invoice",
            link:"/invoices",
            icon:<DescriptionRoundedIcon />
        },
        {
            name:"Inventory",
            link:"/Inventory",
            icon:<InventoryRoundedIcon />
        },
        {
            name:'Tracker',
            link:'/tracker',
            icon:<AccountBalanceWalletRoundedIcon/>

        },
     
     ]

  return (
    <div  className={`h-16 bg-black lg:hidden grid    w-full bottom-0   grid-cols-5 p-2   `} >
           <SideBar scale={sideBarScale} close={()=>setSideBarScale('scale-0')} />
    
        {
            navLine.map((index)=>{
                return(
                    <>
                    <NavTab name={index.name} link={index.link} icon={index.icon}/>
                    </>
                )
            })
        }
        <div   className='grid justify-items-center   items-center text-white ' onClick={()=>{setSideBarScale('scale-100')}} >
        <div>{<MoreHorizRoundedIcon/>}</div>
        <div  className='text-xs'  >{'More'}</div>
    </div>
    </div>
  )
}

export default BottomBar