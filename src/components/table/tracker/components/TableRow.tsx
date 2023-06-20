import { TableCell, TableRow } from '@mui/material'
import React from 'react'

type Props = {i:any,date:string,amount:number,note:string,category:any}

const TableRo = ({i,date,amount,note,category}: Props) => {
     
  return (
          <TableRow key={i}>
              <TableCell>{i}</TableCell>
              <TableCell>{date}</TableCell>
              <TableCell>{note}</TableCell>
              <TableCell>{category}</TableCell>
              <TableCell>{amount}</TableCell>
            </TableRow>
  )
}

export default TableRo