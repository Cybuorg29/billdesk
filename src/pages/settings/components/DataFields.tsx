import { MenuItem, Select, TextField } from '@mui/material'
import { userDetailSchema } from '../../../models/userModel'
import { ImageAspectRatio } from '@mui/icons-material'
import { erpAssets } from '../../../images/ImageExport'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks'

type Props = {client:userDetailSchema,handleInputChange:(type:string,value:any)=>void}

const DataFields = ({client,handleInputChange}: Props) => {
  const user = useAppSelector(state=>state.userData)
  const [addImageScale,setAddImageScale] = useState('scale-0')
 if(user.name ===''){
  return(
    <>
  
        <div  className='flex gap-20' >
        <div className='w-64 h-64 bg-gray-100 col-span-2 relative border   ' onMouseOver={()=>setAddImageScale('scale-100')} onMouseLeave={()=>setAddImageScale('scale-0')} >
              <label htmlFor='upload-image'  className={`w-full h-full bg-black/50 absolute z-50 ${addImageScale} grid items-center cursor-pointer   `} >
              <label htmlFor='upload-image' className=' text-center cursor-pointer text-white' >Upload Image +</label>
              <input  id='upload-image' type='file' hidden className='' onChange={(e)=>{
                const image:any = e.target?.files?.[0]
                handleInputChange('image',image)
              }} accept='jpeg/png' ></input>
              </label>
            <img  src={`url(${client.image})`} alt='profile image'  className='w-full h-full  rounded-lg' >
           
            </img>
        </div>
       <div  className='grid grid-cols-3  gap-2   ' >
            <TextField  label='Business name' value={client?.name} id='name' onChange={(e)=>handleInputChange(e.target.id,e.target.value)} ></TextField>
            <TextField  label='GSTIN' id='gstin' value={client?.gstin} onChange={(e)=>handleInputChange(e.target.id,e.target.value)} ></TextField>
            <TextField  label='Phone' id='phone' value={client?.phone} onChange={(e)=>handleInputChange(e.target.id,e.target.value)} ></TextField>
            <TextField  label='Email' id='email' value={client?.email} onChange={(e)=>handleInputChange(e.target.id,e.target.value)} ></TextField>
            <TextField  label='Building' id='building' value={client?.building} onChange={(e)=>handleInputChange(e.target.id,e.target.value)} ></TextField>
            <TextField  label='City' id='city' value={client?.city} onChange={(e)=>handleInputChange(e.target.id,e.target.value)} ></TextField>
            <TextField  label='District' id='district' value={client?.district} onChange={(e)=>handleInputChange(e.target.id,e.target.value)} ></TextField>
            <TextField  label='State' id='state' value={client?.state} onChange={(e)=>handleInputChange(e.target.id,e.target.value)} ></TextField>
            <TextField  label='Pincode' id='pincode' value={client?.pincode} onChange={(e)=>handleInputChange(e.target.id,e.target.value)} ></TextField>
            <Select  value={client.activities}  name='activities' id='activities' onChange={(e)=>{handleInputChange(e.target.name,e.target.value)}} >
              <MenuItem  value={`ManuFacturing`} >Manufacturing</MenuItem>
              <MenuItem  value={`Distribution`} >Distributor</MenuItem>
              <MenuItem  value={``} ></MenuItem>
              </Select>    
         </div>
        </div>
    </>
  )
  
 }else{
  return(
    <>
        <div  className='flex gap-20' >
        <div className='w-64 h-64 bg-gray-100 col-span-2 relative border   ' onMouseOver={()=>setAddImageScale('scale-100')} onMouseLeave={()=>setAddImageScale('scale-0')} >
              <label htmlFor='upload-image'  className={`w-full h-full bg-black/50 absolute z-50 ${addImageScale} grid items-center cursor-pointer   `} >
              <label htmlFor='upload-image' className=' text-center cursor-pointer' >Upload Image +</label>
              <input  id='upload-image' type='file' hidden className='' accept='jpeg/png' ></input>
              </label>
            <img  src={erpAssets.defualtProfileImg} className='w-full h-full  rounded-lg' >
           
            </img>
        </div>
       <div  className='grid grid-cols-3 gap-2  col-span-4 ' >
            <TextField disabled  label='Business name' value={client?.name} id='name' onChange={(e)=>handleInputChange(e.target.id,e.target.value)} ></TextField>
            <TextField disabled  label='GSTIN' id='gstin' value={client?.gstin} onChange={(e)=>handleInputChange(e.target.id,e.target.value)} ></TextField>
            <TextField disabled  label='Phone' id='phone' value={client?.phone} onChange={(e)=>handleInputChange(e.target.id,e.target.value)} ></TextField>
            <TextField disabled  label='Email' id='email' value={client?.email} onChange={(e)=>handleInputChange(e.target.id,e.target.value)} ></TextField>
            <TextField disabled  label='Building' id='building' value={client?.building} onChange={(e)=>handleInputChange(e.target.id,e.target.value)} ></TextField>
            <TextField disabled  label='City' id='city' value={client?.city} onChange={(e)=>handleInputChange(e.target.id,e.target.value)} ></TextField>
            <TextField disabled  label='District' id='district' value={client?.district} onChange={(e)=>handleInputChange(e.target.id,e.target.value)} ></TextField>
            <TextField disabled  label='State' id='state' value={client?.state} onChange={(e)=>handleInputChange(e.target.id,e.target.value)} ></TextField>
            <TextField disabled  label='Pincode' id='pincode' value={client?.pincode} onChange={(e)=>handleInputChange(e.target.id,e.target.value)} ></TextField>
            <TextField disabled  label='Activities' id='activities' value={client?.activities} onChange={(e)=>handleInputChange(e.target.id,e.target.value)} ></TextField>
        
         </div>
        </div>
    </>
  )
 }
}

export default DataFields