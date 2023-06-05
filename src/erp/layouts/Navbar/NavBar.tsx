import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard';
import { TbFileInvoice } from 'react-icons/tb'
import { IoBookSharp } from 'react-icons/io5'
import { MdOutlineInventory } from 'react-icons/md'
import { Logout, Settings } from '@mui/icons-material'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PercentIcon from '@mui/icons-material/Percent';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import {SlOptions} from 'react-icons/sl'
// import OptionBar from './OptionBar'
import NavButtons from '../../components/Navbar/NavButtons';


type Props = {}

const NavBar = (props: Props) => {
    const navigate = useNavigate()
    const [optionBarScale,setOptionBarScale] = useState(`w-0`)

    const logout=()=>{
        console.log('logout')
         sessionStorage.removeItem('token')
         sessionStorage.removeItem('data')
         sessionStorage.removeItem('id')
        window.location.reload();
    }


    return (
        <>
                    {/* <OptionBar scale={optionBarScale} close={()=>{setOptionBarScale(`w-0`)}}  /> */}


        <div className=' relative col-span-1 bg-slate-900   hidden   lg:block ' >


            {/* navbar buttons */}
            <div className='grid   justify-items-center pt-5 gap-5 lg:scale-100 scale-0 ' >
                <div className='text-white text-xl' >BillDesk</div>
                <NavButtons icon={<DashboardIcon  />} i={`Dashboard`} />
                <NavButtons icon={<TbFileInvoice size={25} />} i={`Invoice`} />
                <NavButtons icon={<IoBookSharp size={25} />} i={`Accounts`} />
                <NavButtons icon={<MdOutlineInventory size={25} />} i={`Inventory`} />
                <NavButtons icon={<PercentIcon  />} i={`Tax`} />
                <NavButtons icon={<LocalShippingIcon  />} i={`Flash Transport`} />
                <NavButtons icon={<CurrencyRupeeIcon  />} i={`Finance`} />
                <div className=' text-white hover:bg-white/20  w-11/12 rounded-lg cursor-pointer flex items-center gap-5 p-2 text-sm '  onClick={()=>{ if(optionBarScale==='w-0'){setOptionBarScale('w-[25vw]')}else{setOptionBarScale('w-0')}}} >
                    <span className='' >{<SlOptions/>}</span><div className=''>{`More`}</div>
                </div>
                

            </div>
            <div className='absolute bottom-5 w-full grid justify-items-center gap-5 ' >
            <div className=' text-white hover:bg-white/20  w-full rounded-lg cursor-pointer flex items-center gap-5 p-2 text-sm '  >
                    <span className=''   >{<Settings/>}</span><div className=''>{`Settings`}</div>
                </div>
            <div className=' text-white hover:bg-white/20  w-full rounded-lg cursor-pointer flex items-center gap-5 p-2 text-sm ' onClick={()=>{logout()}} >
                    <span className=''   >{<Logout/>}</span><div className=''>{`Logout`}</div>
                </div>


            </div>


        </div>
        </>

    )
}



export default NavBar