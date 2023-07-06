import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'
import TableRo from './components/TableRow'
import { useAppSelector } from '../../../store/app/hooks'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { convertIncAndExpCode } from '../../../utils/ConverIncAndExpCode'

type Props = {}

const ExpencesTable = (props: Props) => {
  const { expences } = useAppSelector(state => state.incomeAndExpence)
  const navigate = useNavigate()
  return (
    <div className='border  rounded-xl shadow-xl relative'>
      <div className='p-3 border-b font-bold text-lg'>Expences</div>
      <Table className='' >
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
            expences.map((index: any, i: number) => {
              if (i <= 4) {
                const category = convertIncAndExpCode(index.category)
                return (
                  <>
                    <TableRo amount={index?.amount} date={index?.date} i={++i} note={index.title} category={category} />
                  </>
                )
              }
            })
          }
          <TableRow className='bg-black' ></TableRow>
        </TableBody>
      </Table>
      <div className='h-8 bg-black  hover:h-10 duration-150 absolute bottom-0 z-40 w-full text-end  text-white  text-sm grid justify-items-end items-center pr-10 rounded-b-xl cursor-pointer ' onClick={() => navigate('/view/all/expences')}  >
        <div className='hover:scale-105' >See all {`>`}</div>
      </div>
    </div>
  )
}

export default ExpencesTable