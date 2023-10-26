import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../../store/app/hooks';
import { setEmployee } from '../../../store/features/employee/employeeSlice';

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
    _id:string
    __V:string
  }
  

const EditEmployee = ({}: Props) => {
    const {id} = useParams()
    const [updateEmployee,setUpdateEmployee] = useState<employeeobj>()
    const {employee} = useAppSelector(state=>state.employees)


    const set=()=>{
        let find = false
       employee.map((index:any)=>{
          if(index._id===id){
            find = true
            setUpdateEmployee(index);
          }
       })

       if(!find){
            window.history.back()
       }

    }

    useEffect(() => {
      set()
    }, [])
    

    
  return (
    <div>{`Page under work Please try again after some time`}</div>
  )
}

export default EditEmployee