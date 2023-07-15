import { MenuItem, Select } from '@mui/material'
import React, { useEffect } from 'react'
import { useAppSelector } from '../../../../../store/app/hooks'
import { EmployeeData } from '../../../../../store/actions/data/employee/get'

type Props = {}

const EmployeeList = (props: Props) => {
     const {isEmployee,employee} = useAppSelector(state=>state.employees);

     useEffect(() => {
           EmployeeData()
     }, [employee])
     

  return (
    <div  className='grid gap-3'>
          <label>Select Employee</label>
        <Select className=''>
            {
                employee.map((index:any)=>{
                    return(
                          <MenuItem >{index?.name}</MenuItem>
                    )
                })

            }
        </Select>
    </div>
  )
}

export default EmployeeList