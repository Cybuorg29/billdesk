import React from 'react'
import {   Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
type Props = {}

const Tables = (props: Props) => {
  return (
    <div  className=' rounded-xl' >
    <div className=' border' >
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Client Name</TableCell>
                    <TableCell>View Transaction</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>ADITYA</TableCell>
                    <TableCell className='' >
                        <div className='text-blue-700 uppercase cursor-pointer w-fit' >View</div>
                    </TableCell>
                    <TableCell>
                        <span className='p-2'  ><RemoveRedEyeRoundedIcon/></span>
                        <span className='p-2'  ><DeleteRoundedIcon/></span>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</div>
  )
}

export default Tables