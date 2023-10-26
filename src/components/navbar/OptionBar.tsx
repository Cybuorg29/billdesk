import React from 'react'
import { OptionTabsModel } from '../../models/Navbar/OptionBarTabs'
import OptionTabs from './components/optionBar/OptionTabs'
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

type Props = {scale:{value:string,set:any}}

const OptionBar = ({scale}: Props) => {
  const OptionTabArray:OptionTabsModel[]=[
    {
        name:'Search User',
        navigate:'/Search/user',
        icon:<ManageSearchIcon/>,
        action:()=>{scale.set('w-0')}
    },
]
  return (
    <div  className={`absolute  z-50  h-[99%]  ${scale.value} bg-white shadow-xl  border  duration-500 overflow-hidden  right-0`} >
        <div className='text-gray-500 p-4 text-xl' ><span className='cursor-pointer' onClick={()=>scale.set('w-0 h-0')} >X</span></div>
         {
            OptionTabArray.map((index:OptionTabsModel)=>{
                return <OptionTabs navigate={index.navigate} action={index.action} icon={index.icon} name={index.name}  />
            })
         }
    </div>
  )


}

export default OptionBar