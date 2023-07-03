import { IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from '@mui/material'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppSelector } from '../../../../store/app/hooks'
import { incomeAndExpencesObjectSchema } from '../../../../store/features/IncomeAndExpences/IncomeAndExpences'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { convertIncAndExpCode } from '../../../../utils/ConverIncAndExpCode'
type Props = {}

const ExpenceTable = (props: Props) => {
    const { expences } = useAppSelector(state => state.incomeAndExpence)
    const { sort } = useParams()
    return (
        <div>
            <div className='mt-5 overflow-auto' >

                <div>
                    <div className="flex flex-col" >
                        <div className="">
                            <div className="inline-block min-w-full ">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-left text-sm font-light">
                                        <thead className="border-b font-medium dark:border-neutral-500 uppercase">
                                            <tr className="border-b dark:border-neutral-500">
                                                <th scope="col" className='px-6 py-4' >#</th>
                                                <th scope="col" className='px-6 py-4' >Date</th>
                                                <th scope="col" className='px-6 py-4' >Category</th>
                                                <th scope="col" className='px-6 py-4' >Title</th>
                                                <th scope="col" className='px-6 py-4' >Amount</th>
                                                <th scope="col" className='px-6 py-4' >Action</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                expences.map((index: incomeAndExpencesObjectSchema, i: number) => {
                                                    if (sort === index.category || sort === 'all') {
                                                        let category: string = convertIncAndExpCode(index.category)

                                                        console.log(category)
                                                        return (
                                                            <tr className="border-b dark:border-neutral-500">
                                                                <td className="whitespace-nowrap px-6 py-4 font-medium">{++i}</td>
                                                                <td className="whitespace-nowrap px-6 py-4">{index.date}</td>
                                                                <td className="whitespace-nowrap px-6 py-4">{category}</td>
                                                                <td className="whitespace-nowrap px-6 py-4">{index.title}</td>
                                                                <td className="whitespace-nowrap px-6 py-4">{index.amount}</td>
                                                                <td className="whitespace-nowrap px-6 py-4">{
                                                                    <div className='flex gap-2' aria-label='asdfasdas' >
                                                                        {/* <DeleteIcon color='error' className='cursor-pointer  ' /> */}
                                                                        {/* //     <EditIcon color='info' /></div> */}
                                                                        <Tooltip title="Delete Expence">
                                                                            <IconButton>
                                                                                <DeleteIcon color='error' className='cursor-pointer' />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                        <Tooltip title="Edit Expence">
                                                                            <IconButton>
                                                                                <EditIcon color='info' className='cursor-pointer' />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </div>
                                                                }</td>
                                                            </tr>
                                                        )

                                                    }
                                                })
                                            }
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExpenceTable