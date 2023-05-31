import React from 'react'
import { Link } from 'react-router-dom'
import OptionTab from '../../components/Navbar/OptionTab'
import { ArrowBack } from '@mui/icons-material'
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import ArchiveIcon from '@mui/icons-material/Archive';
import StoreIcon from '@mui/icons-material/Store';

type Props = {scale:string,close:any}

const OptionBar = ({scale,close}: Props) => {
     const id:string = 'asdasdasdsadad'
   
return (
<div className={`fixed h-screen    bg-white shadow-xl right-0 z-50 flex flex-col ${scale} duration-300  text-xs text-gray-800`} >
      <div className=' text-start p-4 cursor-pointer ' onClick={()=>{close()}} >X</div>
    <OptionTab icon={<PersonIcon/>}  name={`Manage Client`} link={`Client`}   close={()=>close()} />
    <OptionTab icon={<PersonOutlineIcon/>}  name={` Manage Supplier`} link='supplier'  close={()=>close()} />
    <OptionTab icon={<UnarchiveIcon/>}  name={`Manage Products`} link={`products`}  close={()=>close()} />
    <OptionTab icon={<ArchiveIcon/>}  name={`Manage Raw Materials`} link='raw'  close={()=>close()} />
    <OptionTab icon={<StoreIcon/>}  name={`Store`} link='store'  close={()=>close()} />
    <OptionTab icon={<SettingsIcon/>}  name={`Settings`} link='setting'  close={()=>close()} />
   

</div>
)
}

export default OptionBar