import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import BottomBar from '../../../components/navbar/mobile/BottomBar'
import SideBar from '../../../components/navbar/mobile/components/SideBar'
import Topbar from '../../../components/navbar/Topbar'
import { initialiseUserData } from '../../../store/actions/user/user'
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks'

type Props = {}

const MobileMain = (props: Props) => {

  const user = useAppSelector(state=>state.userData)
  const token = useAppSelector(state=>state.auth)
  const navigate= useNavigate()
useEffect(() => {
  // checking if the token is available
     if(token.istoken===false){
       navigate('/login ')
          // toast.info('please Login to continue')
     }else{
      // toast.info('loggedin')
      initialiseUserData()



     }
}, []);


useEffect(() => {
console.log("change User ", user);
if(user.name===''){
  navigate('/settings')
}
if(!token.istoken){
 toast.info('please login to continue')
 navigate('/login')
}else{
   initialiseUserData()
}

}, [token.istoken]);

useEffect(()=>{
console.log('change',user)
},[user])
const [sideBarScale,setSideBarScale] = useState('w-0')

 
  return (
  //   <div style={{ width: '100vw' }}>
  //   <div style={{ backgroundColor: 'blue', height: '50px' }}>
  //     {/* Top Bar */}
  //   </div>
  //   <div style={{ backgroundColor: 'gray', minHeight: 'calc(100vh - 100px)' }}>
  //     {/* Content */}
  //   </div>
  //   <div style={{ backgroundColor: 'green', height: '50px' }}>
  //     {/* Bottom Navbar */}
  //   </div>
  // </div>
 
   <div  className='w-full h-screen  ' >
    <SideBar scale={sideBarScale}  close={()=>setSideBarScale('w-0')} />
     <div className='h-[10%] bg-white  rounded-xl  ' >
        <Topbar  />
     </div>
     <div  className='h-[82%]  overflow-auto ' >
      <Outlet/>
     </div>
     <div  className='h-[8%] ' >
      <BottomBar  open={()=>setSideBarScale('w-[75vw]')} />
     </div>


   </div>

  )
}

export default MobileMain