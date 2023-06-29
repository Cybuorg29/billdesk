import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../../store/app/hooks'
import TableRo from './components/TableRow'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

type Props = {}

const IncomeTable = (props: Props) => {
    const {income} = useAppSelector(state=>state.tracker)
    const navigate = useNavigate()
  return (
    <div className='border  rounded-xl shadow-xl relative'>
        <div className='p-5 border-b font-bold text-lg'>Income</div>
           <Table  className='' >
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
                income.map((index:any,i:number)=>{
                    if(i<=3){
                        return(
                            <>
                        <TableRo amount={index?.amount} date={index?.date} i={++i} note={index.title} category={index?.category}/>
                        </>
                    )
                }
                })
            }
          </TableBody>
        </Table>
        <div className='h-8 bg-black hover:h-10 duration-150 absolute bottom-0 z-40 w-full text-end  text-white  text-sm grid justify-items-end items-center pr-10 rounded-b-xl cursor-pointer '  >
            <div  className='hover:scale-105' >See all {`>`}</div>
        </div>
    </div>
  )
}

export default IncomeTable