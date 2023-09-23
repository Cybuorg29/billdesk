import React from 'react'
import {OptionTabsModel} from '../../../../models/Navbar/OptionBarTabs'
import { useNavigate } from 'react-router-dom'

type props ={close:Function}

const OptionTabs = ({action,icon,name,navigate}:OptionTabsModel,{close}:props) => {
   const naviGate = useNavigate()
  return (
    <div className='flex gap-2  border cursor-pointer hover:bg-gray-200 p-2' onClick={()=>{naviGate(`${navigate}`);action()}} >
        <div>{icon}</div>
        <div>{name}</div>        
    </div>
  )
}

export default OptionTabs