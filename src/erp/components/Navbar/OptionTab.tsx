import React from 'react'
import { Link } from 'react-router-dom'

type Props = {icon:any,name:string,link:string,close:any}

const OptionTab = ({icon,name,link,close}: Props) => {
     const id:string = 'asdasdas'
    return(
        <>
      <Link  to={`/erp/${id}/${link}`} onClick={()=>{close()}} >
           <div className='flex gap-3 p-1 text-xs lg:text-lg lg:p-3 border hover:bg-blue-200/20 cursor-pointer ' >
        <div>{icon}</div>
        <div>{name}</div>
    </div> 
      </Link>
        </>
    )
}

export default OptionTab