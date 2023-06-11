import { TextField } from '@mui/material'
import { userDetailSchema } from '../../../../models/userModel'

type Props = {client:userDetailSchema,handleInputChange:(type:string,value:any)=>void}

const DataFields = ({client,handleInputChange}: Props) => {
  return (
       <div  className='grid grid-cols-3 gap-2 ' >
            <TextField  label='Business name' value={client?.name} id='name' onChange={(e)=>handleInputChange(e.target.id,e.target.value)} ></TextField>
            <TextField  label='GSTIN' id='gstin' value={client?.gstin} onChange={(e)=>handleInputChange(e.target.id,e.target.value)} ></TextField>
            <TextField  label='Phone' id='phone' value={client?.phone} onChange={(e)=>handleInputChange(e.target.id,e.target.value)} ></TextField>
            <TextField  label='Email' id='email' value={client?.email} onChange={(e)=>handleInputChange(e.target.id,e.target.value)} ></TextField>
            <TextField  label='Building' id='building' value={client?.building} onChange={(e)=>handleInputChange(e.target.id,e.target.value)} ></TextField>
            <TextField  label='City' id='city' value={client?.city} onChange={(e)=>handleInputChange(e.target.id,e.target.value)} ></TextField>
            <TextField  label='District' id='district' value={client?.district} onChange={(e)=>handleInputChange(e.target.id,e.target.value)} ></TextField>
            <TextField  label='State' id='state' value={client?.state} onChange={(e)=>handleInputChange(e.target.id,e.target.value)} ></TextField>
             
         </div>
  )
}

export default DataFields