import React from 'react'
import { Link } from 'react-router-dom'
import '../Navbar.css'


type Props = {name:string,link:string,icon:any}

const NavTab = ({name,link,icon}: Props) => {

    // return  <Link to={`${link}`} className='w-full cursor-pointer text-white'>
    //     <div className='text-lg hover:bg-white/20 w-full p-2  rounded-md cursor-pointer flex gap-2 '>
    //         <span className='text-white' >{icon}</span><span>{name}</span> 
            
    //     </div>
    //   </Link>
    
   return <div>
       <Link to={`${link}`} className=" value">
        <div>{icon}</div>
      {name}
    </Link>
    </div>
  
}

export default NavTab