import React, { useEffect } from 'react'
import NavBar from '../../navbar/NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ListRoundedIcon from '@mui/icons-material/ListRounded';
import Topbar from '../../navbar/Topbar';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { useDispatch } from 'react-redux';
import { saveToken } from '../../store/features/auth/authSlice';
import Loader from '../../Loaders/Loader';
import { change } from '../../store/features/loader/loaderSlice';
import { getUserData } from '../../api/userServices';
import { initilise } from '../../store/features/user/userSlice';
import { toast } from 'react-toastify';
import { initliseBank } from '../../store/features/bank/bankSlice';
type Props = {}

const Main = (props: Props) => {
      const user = useAppSelector(state=>state.userData)
       const token = useAppSelector(state=>state.auth)
       const dispatch = useAppDispatch()
       const navigate= useNavigate()

   const initiliseData=async()=>{
        // console.log(data)
        try{
          
          dispatch(change())     
          //  toast.success('khjh') 
            const {data} = await getUserData(token.token)
            if(data.code===200){
              //  toast.success('sucess')
              toast.success(data.user.name)
              dispatch(initilise(data?.user))   
              dispatch(initliseBank(data?.bank))           
              dispatch(change())
              if(data.user.name===''){
                toast.info('please setup your profile')
                navigate('/settings')
              }

            }
          }catch(err:any){
            toast.error(err.message)
            dispatch(change())
          }
         
   }
   useEffect(()=>{
       if(!token.istoken){
        navigate('/login')
       }else{
         initiliseData()
       }

   },[token.istoken])

   useEffect(()=>{
      console.log('change User ',user)
   },[user])

  return  (
    <>
     <Loader/>
    <div className='grid grid-cols-7  '>
      <div className='grid col-span-1    ' >
        <div className='bg-navbar  shadow-2xl  ' >
        <NavBar/>

        </div>
      </div>
      <div className=' col-span-6  overflow-auto h-screen p-2 rounded-2xl  grid gap-5 ' >
         <Topbar  name={'Diya Industries'} />
        <div className='w-full h-[90vh] shadow-2xl border rounded-2xl ' >
          <Outlet ></Outlet>

        </div>
 
      </div>
    </div>
    </>
  )
}

export default Main