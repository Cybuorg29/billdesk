import { TableCell, TableRow } from '@mui/material'
import React from 'react'

type Props = { i: any, date: string, amount: number, note: string, category: any }

const TableRo = ({ i, date, amount, note, category }: Props) => {

  return (
    <TableRow key={i}>
      <TableCell className='text-sm' >{i}</TableCell>
      <TableCell className='text-sm' >{date}</TableCell>
      <TableCell className='text-sm' >{note}</TableCell>
      <TableCell className='text-sm' >{category}</TableCell>
      <TableCell className='text-sm' >{amount}</TableCell>
    </TableRow>
  )
}

export default TableRo