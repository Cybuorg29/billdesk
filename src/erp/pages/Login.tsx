import React, { useState } from 'react'
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { TextField } from '@mui/material';
import {  useNavigate } from 'react-router-dom';
import { reqLogin } from '../../api/user/user';
import { loginArg } from '../Model/UserModel';

type Props = {}

 const  Login=({}: Props)=> {
    const navigate = useNavigate()
    const [username,setUsername] = useState<string>(``)
    const [password,setPassword] = useState<string>(``)
    
      const args:loginArg ={
        username:username,
        password:password
        
      }
      
     const login=async()=>{
      const result = await reqLogin(args)
        console.log(result)
        if (result.data.message===200){
           console.log(result.data.id)
          const token = result.data.token;
           sessionStorage.setItem('token',JSON.stringify(token))
           alert('logined sucessfully ')
            navigate(`/erp/${result.data.id}/dashboard`)
         }else{
          alert('invalid credentials')
          
         }
     }

  return (
    <>
    <div className='grid  items-center lg:h-screen '  >
       
        <div className=' h-full w-full gap-5  grid items-center justify-items-center p-8 ' >
               <div className=' grid grid-flow-row gap-7 '>
               <div className='text-5xl p-10 pl-10'>Welcome Back</div>
                <TextField placeholder='Username'   onChange={(e)=>{setUsername(e.target.value)}}  className='lg:w-[500px]  m-5 py-2.5  '   />
                <TextField placeholder='Password'   onChange={(e)=>{setPassword(e.target.value)}}  className='lg:w-[500px]  m-5 py-2.5 ' type='password'  />

               <div className='pl-5 flex items-center gap-10'>
              <Button onClick={()=>login()} size='lg'  className='m-5  ml-20 p-20' color='info' >Login</Button>
              <div className='cursor-pointer' >Forgot Password ?</div>
                </div>     
                <div className='text-center ' >
                  <div className='p-5'>Or</div>
                <Button onClick={()=>{navigate(`/register`)}} size='lg'  className='m-5  p-5  w-full ml-20 ' color='info' >Register</Button>


                  </div>  

               </div>

        </div>

    </div>
    </>
  )
}

export default Login