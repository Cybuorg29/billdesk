import React from 'react'
import { Link } from 'react-router-dom'

type Props = {icon:any,name:string,link:any}

const NavTab = ({icon,name,link}: Props) => {
  return (
    <Link to={`${link}`}  className='grid justify-items-center   items-center text-white ' >
        <div>{icon}</div>
        <div  className='text-xs'  >{name}</div>
    </Link>
  )
}

export default NavTab