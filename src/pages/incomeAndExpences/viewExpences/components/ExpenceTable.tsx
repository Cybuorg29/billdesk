import { Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppSelector } from '../../../../store/app/hooks'
import { incomeAndExpencesObjectSchema } from '../../../../store/features/IncomeAndExpences/IncomeAndExpences'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { convertIncAndExpCode } from '../../../../utils/ConverIncAndExpCode'
type Props = { setUid: (value: string) => void, openEdit: (value: any) => void }

const ExpenceTable = ({ setUid, openEdit }: Props) => {
    const { expences } = useAppSelector(state => state.incomeAndExpence)
    const { sort, limit } = useParams()
    const navigate = useNavigate()
    const { token } = useAppSelector(state => state.auth)

    useEffect(() => { }, [sort, token])
    return (
        <div className=''>
            <div className='mt-5 overflow-auto w' >
                <div className='grid  grid-flow-col  place-items-center w-full border-b border-black p-2' >
                    <div className='flex items-center gap-4 '> <div>Show</div>

                        <select value={limit} onChange={(e) => { navigate(`/view/${sort}/${e.target.value}/expences`) }}  >
                            <option value='10'>10</option>
                            <option value='25'>25</option>
                            <option value='50'>50 </option>
                            <option value='500'>all</option>
                        </select>
                    </div>
                    <div className='flex items-center gap-4 '> <div>View</div>

                        <select value={sort} onChange={(e) => { navigate(`/view/${e.target.value}/${limit}/expences`) }}  >
                            <option value='400'>Salaries Paid </option>
                            <option value='500'>others</option>
                            <option value='300'>Purchase </option>
                            <option value='200'>Purchase of Goods</option>
                            <option value='100'>Provision Paid</option>
                            <option value='all'>All</option>
                        </select>
                    </div>

                    <div className='w-full grid place-items-end' ><Button variant='outlined' color='error' className='w-1/2 px-5 py-5 uppercase' onClick={() => navigate(`/create/expence`)} >ADD Expence</Button></div>

                </div>

                <div>
                    <div className="flex flex-col" >
                        <div className="">
                            <div className="inline-block min-w-full ">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-left text-sm font-light">
                                        <thead className="border-b font-medium border-neutral-500 uppercase sticky top-0">
                                            <tr className="border-b border-neutral-500">
                                                <th scope="col" className='px-6 py-4  sticky ' >#</th>
                                                <th scope="col" className='px-6 py-4  sticky ' >Date</th>
                                                <th scope="col" className='px-6 py-4  sticky ' >Category</th>
                                                <th scope="col" className='px-6 py-4  sticky ' >Title</th>
                                                <th scope="col" className='px-6 py-4  sticky ' >Amount</th>
                                                <th scope="col" className='px-6 py-4  sticky ' >Action</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                expences.map((index: any, i: number) => {

                                                    let lim: string = `${limit}`;
                                                    let j = parseInt(lim)
                                                    if (sort === index.category || sort === 'all') {
                                                        if (limit === '500' || i <= --j) {
                                                            let category: string = convertIncAndExpCode(index.category)

                                                            return (
                                                                <tr className="border-b dark:border-neutral-500">
                                                                    <td className="whitespace-nowrap px-6 py-4 font-medium">{++i}</td>
                                                                    <td className="whitespace-nowrap px-6 py-4">{index.date}</td>
                                                                    <td className="whitespace-nowrap px-6 py-4">{category}</td>
                                                                    <td className="whitespace-nowrap px-6 py-4">{index.title}</td>
                                                                    <td className="whitespace-nowrap px-6 py-4">{index.amount}</td>
                                                                    <td className="whitespace-nowrap px-6 py-4">{
                                                                        <div className='flex gap-2' aria-label='asdfasdas ' >
                                                                            <Tooltip title="Delete Expence " >
                                                                                <IconButton onClick={() => setUid(index._id)} >
                                                                                    <DeleteIcon color='error' className='cursor-pointer' />
                                                                                </IconButton>
                                                                            </Tooltip>
                                                                            <Tooltip title="Edit Expence">
                                                                                <IconButton onClick={() => { openEdit(index) }}>
                                                                                    <EditIcon color='info' className='cursor-pointer' />
                                                                                </IconButton>
                                                                            </Tooltip>
                                                                        </div>
                                                                    }</td>
                                                                </tr>
                                                            )
                                                        }

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