import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import BottomBar from '../../../components/navbar/mobile/BottomBar'
import Topbar from '../../../components/navbar/Topbar'
import { initialiseUserData } from '../../../store/actions/user/user'
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks'

type Props = {}

const MobileMain = (props: Props) => {

  const user = useAppSelector(state=>state.userData)
  const token = useAppSelector(state=>state.auth)
  const dispatch = useAppDispatch()
  const navigate= useNavigate()
useEffect(() => {
  // checking if the token is available
     if(token.istoken===false){
       navigate('/login ')
          toast.info('please Login to continue')
     }else{
      toast.info('loggedin')
      initialiseUserData()


     }
}, []);


useEffect(() => {
console.log("change User ", user);
// if(user.name===''){
//   navigate('/settings')
// }
if(!token.istoken){
 toast.info('please login to continue')
 navigate('/login')
}else{
  //  initialiseUserData()
}

}, [token.istoken]);

useEffect(()=>{
console.log('change',user)
},[user])

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
     <div className='h-[7%] bg-white  rounded-xl p-2 ' >
        <Topbar name={'asdasdasd'} />
     </div>
     <div  className='h-[85%]  ' >
      <Outlet/>
     </div>
     <div  className='h-[8%] ' >
      <BottomBar/>
     </div>


   </div>

  )
}

export default MobileMain