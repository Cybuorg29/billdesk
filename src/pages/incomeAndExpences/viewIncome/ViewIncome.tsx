import { Button, MenuItem, Select, Table, TableCell, TableHead, TableRow } from '@mui/material'
import React,{useEffect, useState} from 'react'
import { getIncome } from '../../../store/actions/data/DataActions'
import { useAppSelector } from '../../../store/app/hooks'
import { incomeAndExpencesObjectSchema } from '../../../store/features/IncomeAndExpences/IncomeAndExpences'
import IncomeTable from './components/IncomeTable'
import TopTab from './components/TopTab'

type Props = {}

const ViewIncome = (props: Props) => {
   const [sortValue,setSortValue] = useState('All')
   
   useEffect(() => {
       getIncome()

   }, [])

   useEffect(()=>{
      
   },[sortValue])
   
  return (
    <div  className='grid gap-5' >
      {/* {TopTab(sortValue, setSortValue)} */}
      <TopTab     />
       <IncomeTable     /> 
         
     


    </div>
  )
}

export default ViewIncome


