import React, { EventHandler, ReactEventHandler, useState } from 'react'
import { employeeObject } from '../../../store/features/employee/employeeSlice'
import { Input } from '@mui/joy';
import { MenuItem, Select } from '@mui/material';
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton';

type Props = {}

interface employeeobj {
  name: string;
  adress: string;
  salary: number;
  balance: number;
  id: string;
  image: any;
  type: number;
  phone:string;
}

const AddEmployee = (props: Props) => {
     const [employee,setEmployee]:any = useState<employeeobj>()
      const [imageScale,setImageScale] = useState('scale-0')
      const handleImageHover=()=>{
         if(imageScale==='scale-100'){
            setImageScale('scale-0')
         }else{
            setImageScale('scale-100')
         }
      }

         const handleImageInput=(e:React.ChangeEvent<HTMLInputElement>)=>{
             const file :any = e.target?.files?.[0];
             setEmployee((prev:employeeobj)=>{return{...prev,image:file}});
               setImageScale('scale-0')
                  const img:any  =   URL.createObjectURL(file)
                    document.getElementById('InImage')?.setAttribute('src',img)
         }

         const handleDetailsInput=(e:React.ChangeEvent)=>{

         }
      
  return (
    <div className="w-full h-full p-5  flex flex-col gap-5">
      <div className="text-xl">Add Employee</div>

      <div className=" flex  h-[80%] p-4">
        <div className=" grid flex-wrap gap-5  w-full h-fit  ">
          <div className="h-52 w-52  border-[10px]  border-[#E5E7EB] rounded-xl relative "  onMouseEnter={()=>handleImageHover()} onMouseLeave={()=>handleImageHover() }>
              <div className={`absolute  w-full h-full bg-black opacity-70 z-50 p-2 grid items-center   ${imageScale} `} >
                <label htmlFor='imageInput' className='px-5 py-2 text-white cursor-pointer text-center border rounded-xl'  >Add Image</label>
                <Input id={'imageInput'} type='file' className='scale-0' onChange={(e)=>{handleImageInput(e)}} ></Input>
            </div>
            <img
            id='InImage'
              // src="https://res.cloudinary.com/dcnu7ucih/image/upload/v1687692203/profile/bygtpxe14qwialrm6hn8.jpg"
              src={`${employee?.image}`}
              alt="photo"
              className="w-full h-full"
            />
          

          </div>
          <div className="grid grid-cols-2 w-full flex-wrap gap-5 items-center">
            <div>
              <label>Name</label>
              <Input   value={employee?.name} type='text'    onChange={(e:any)=>{setEmployee((prev:employeeobj)=>{return{...prev,name:e.target.value}})}}   />
            </div>{" "}
            <div>
              <label>Adress</label>
              <Input   value={employee?.adress}   onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setEmployee((prev:employeeobj)=>{return{...prev,adress:e.target.value}})}}  />
            </div>{" "}
             <div>
              <label>Phone</label>
              <Input   value={employee?.phone}   onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setEmployee((prev:employeeobj)=>{return{...prev,phone:e.target.value}})}}  />
            </div>{" "}
            <div>
              <label>Salary</label>
              <Input   type='number'  value={employee?.salary}   onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setEmployee((prev:employeeobj)=>{return{...prev,salary:e.target.value}})}}  />
            </div>{" "}
            <div>
              <label>Balance</label>
              <Input   type='number' value={employee?.balance} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setEmployee((prev:employeeobj)=>{return{...prev,balance:e.target.value}})}}  />
            </div>{" "}
            
            <div className="grid">
              <label>Employee Type</label>
              <Select value={employee?.type}   onChange={(e:any)=>{ setEmployee((prev:employeeobj)=>{return{...prev,type:e.target.value}})}} >
                <MenuItem value={200}>Regular</MenuItem>
                <MenuItem  value={100 } >Contract/Temperory</MenuItem>
              </Select>
            </div>
          </div>  
          <div>
            <SolidButton color='' innerText='Add Employee' onClick={()=>{}}  />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee