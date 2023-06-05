import React, { useEffect } from 'react'


import { MenuItem, Select, TextField } from '@mui/material'
import{ useState } from 'react'
import Button from '@mui/joy/Button';
import { Input } from '@mui/joy';
import { userService } from '../../api/user/userService';
import { registerArg } from '../Model/UserModel';
import { register } from '../../api/user/user';
import Top from '../components/signup/Top';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const  Signup:React.FC = () => {
   const navigate = useNavigate()
  const [name,setBusinessName] = useState<String>(``)
  const [activities,setActivities] = useState<String>(``)
  const [gstin,setGstin] = useState<String>(``)
  const [phone,setPhone] = useState<String>(``)
  const [email,setEmail] = useState<String>(``)
  const [building,setBuilding] = useState<String>(``)
  const [landmark,setLandmark] = useState<String>(``)
  const [district,setDisrtict] = useState<String>(``)
  const [pincode,setPincode] = useState<String>(``)
  const [state,setState] = useState<String>(``)
  const [adress,setAdress] = useState<String>(``)
  const [username,setUsername]  = useState<String>(``)
  const [password,setPassword] = useState<String>(``)
  const [inNo,setInNo] = useState<Number>(0)

   const args:registerArg =  {
    name :name ,
    gstin :gstin ,
    phone :phone ,
    email :email ,
    building :building ,
    landmark :landmark ,
    district :district ,
    pincode :pincode ,
    state :state ,
    activities :activities ,
    username :username ,
    password :password ,
    adress :adress ,
    inNo :inNo 

   }

  const submit =async()=>{
     try{

       console.log(adress)
       const res = await register(args)
        console.log('res',res)
       if(res.status===200){
         toast.success('registered sucessfully please login to continue')
         navigate('/login')
         
         
        }else{
          toast.error('an error occured')
        }
      }catch(err:any){
        toast.error(err.message)
      }
              // const {data} = await one
      //  console.log(data)
  }

  // useEffect(() => {
  //   userService.register().then((res)=>console.log('console',res.data)).catch()
  // }, [])
  
  
  return (
    <>
      {/* <div className='text-5xl p-5 border' >Workware</div> */}
      <Top h='black' />
    <div className='grid  w-full  justify-items-center'>
        {/* general info div  */}
         <div className='w-full p-10' >
          <div>
            <div className='p-5    text-xl text-gray-500 '>General</div>
            <div className='grid lg:grid-cols-2 w-full gap-10 '>
          <TextField className='w-11/12 ' onChange={(e)=>{setBusinessName(e.target.value)}} required={true} label={`Business Name`} ></TextField>
          <TextField className='w-11/12 ' onChange={(e)=>{setGstin(e.target.value)}} required={true} label={`GSTIN`} ></TextField>
          <TextField className='w-11/12 ' onChange={(e)=>{setPhone(e.target.value)}} required={true} label={`Phone Number`}  ></TextField>
          <TextField className='w-11/12 ' onChange={(e)=>{setEmail(e.target.value)}} required={true} label={`Email`}  ></TextField>
            </div>
           
          </div>
          <div>
            <div className='p-5  text-xl text-gray-500 '>Adress</div>
            <div className='grid lg:grid-cols-2 w-full gap-10 '>
          <TextField className='w-11/12 '  onChange={(e)=>{setBuilding(e.target.value)}}   label={`Building`} ></TextField>
          <TextField className='w-11/12 '  onChange={(e)=>{setLandmark(e.target.value)}}   label={`Landmark`} ></TextField>
          <TextField className='w-11/12 '  onChange={(e)=>{setDisrtict(e.target.value)}}   label={`District`} ></TextField>
          <TextField className='w-11/12 '  onChange={(e)=>{setPincode(e.target.value)}}    label={`Pincode`} ></TextField>
          <TextField className='w-11/12 '  onChange={(e)=>{setState(e.target.value)}}   label={`State`} ></TextField>
          <TextField className='w-11/12 '  onChange={(e)=>{setAdress(e.target.value)}}   label={`Adress`} ></TextField>
          <div>
          <label   >Invoice No<span className='text-gray-500 text-sm' >(number of invoice to start )</span></label>
          {/* <Input className='w-11/12 '      onChange={(e)=>{setInNo(e.target.value)}}   label={`InvocieNo`} ></Input> */}
          </div>
            </div>
           
          </div>
          <div>
            <div className='p-5  text-xl text-gray-500 '>Business Activities</div>
            <div className='grid lg:grid-cols-2 w-full gap-10 '>
               <Select className='w-11/12'
               value={activities}
               onChange={(e)=>{setActivities(e.target.value);console.log(e.target.value)}}

                >
                <MenuItem  value='Manufacturing' >Manufacturing</MenuItem>
                <MenuItem  value='Distibutor' >Distibutor</MenuItem>
                </Select>     
            </div>
           
          </div>
          <div className='pb-5' >
            <div className='p-5  text-xl text-gray-500 '>Create  User Credeintials</div>
            <div className='grid  w-full gap-10 '>
            <TextField className='lg:w-5/12 ' onChange={(e)=>{ setUsername(e.target.value)}} label={`Username`} ></TextField>
          <TextField className='lg:w-5/12 '   onChange={(e)=>{setPassword(e.target.value)}} label={`Password`} ></TextField>                
            </div>
          </div>
          <Button  size='lg' onClick={()=>{submit()}}   className='m-5  p-5 ml-20 ' color='info' >Register</Button>
        

         </div>
    </div>
    </>
  )
}



export default Signup