import { MenuItem, Select } from '@mui/material'
import React, { useEffect } from 'react'
import { useAppSelector } from '../../../../../store/app/hooks'
import { EmployeeData } from '../../../../../store/actions/data/employee/get'
import { useNavigate } from 'react-router-dom'

type Props = {value:string,handleChange:any}

const EmployeeList = ({handleChange,value}: Props) => {
     const {isEmployee,employee} = useAppSelector(state=>state.employees);
      const naviagate = useNavigate()

     useEffect(() => {
           EmployeeData()
     }, [employee])
     

  return (
    <div  className='grid gap-3'>
          <label>Select Employee</label>
        <Select className=''  value={value}  onChange={(e:any)=>{handleChange(e.target.value)}} >
            {
                employee.map((index:any)=>{
                    return(
                          <MenuItem  value={`${index?._id}`} >{index?.name}</MenuItem>
                    )
                })

            }
            <MenuItem  onClick={()=>{naviagate(`/create/employee`)}}    ><div  className='font-bold' >Add Employee</div></MenuItem>
        </Select>
    </div>
  )
}

export default EmployeeList