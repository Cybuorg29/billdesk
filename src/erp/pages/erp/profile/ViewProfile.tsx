import React, { useEffect, useState } from 'react'
import DetailInfo from '../../../components/profile/DetailInfo'
import { getUserData } from '../../../../api/user/user'
import { useParams } from 'react-router-dom'
import { storeUserInterface } from '../../../Model/UserModel'
import { Button } from '@mui/material'
import { toast } from 'react-toastify'

type Props = {}

const ViewProfile = (props: Props) => {
   const {name} = useParams()
   const [user,setUser] = useState<storeUserInterface>()
    
   useEffect(() => {
      getData()
   
   }, [])

   const getData=async()=>{
     // const {name} = useParams()
     try{

      const res = await  getUserData(name)
      if(res.data.code===200){

        console.log('res',res.data.user)
        setUser(res.data.user)

      }else{

        toast.error(res.data.code)
        toast.error(res.data.message)
      }
    }catch(err:any){
      toast.error('error')
      toast.error(err?.message)
    }

     

   }
    useEffect(() => {

  
    }, [user])
    
    const ifConnected=()=>{
      
    }
   
  return (
    <div>
      <div  className='grid grid-cols-6 gap-10  border p-5' >

      <div className='w-64 h-64 bg-slate-100 col-span-2 ' >
      </div>
      <div className='grid grid-cols-3  col-span-4   ' >
        <DetailInfo name='Business Name' detail={user?.name}  />
        <DetailInfo name='GSTIN' detail={user?.gstin}  />
        <DetailInfo name='Phone' detail={user?.phone}  />
        <DetailInfo name='Email' detail={user?.email}  />
        <DetailInfo name='Adress' detail={user?.adress}  />
        <DetailInfo name='Business Activities' detail={user?.activities}  />
      </div>
      </div>
      <div className='border shadow-lg m-5 ' >
        <div  className='p-5 grid grid-cols-2' >
          <div>Connect</div>
          <div className='grid justify-items-end' >
            <Button  variant='outlined' >Connect</Button>
          </div>

        </div>
      </div>
    </div>
  )

 
}

export default ViewProfile