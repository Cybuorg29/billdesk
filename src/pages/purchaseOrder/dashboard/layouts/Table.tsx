import React, { useEffect, useState } from 'react'
import DashboardTable from '../../../../components/ui/table/dashboardTable'
import { initliseDashboardArray } from '../functions/initliseDashboardArray'
import { useAppSelector } from '../../../../store/app/hooks'
import { MenuItem, Select } from '@mui/material'
import { ICREATE_PURCHASE_ORDER, IPURCHASE_ORDER } from '../../model/model'
import PurchaseOrderDeleteDialog from '../../Delete/DeleteDialog'
import { useNavigate } from 'react-router-dom'

type Props = {}

const Table = (props: Props) => {

    const { purchase_Order } = useAppSelector(state => state.po);
    const [toDelete, setToDelete] = useState<IPURCHASE_ORDER>()
    const [DeleteDialogIsOpen, setDeleteDialogIsOpen] = useState<boolean>(false);
    const [index, setIndex] = useState<number>(0);
    const navigate = useNavigate()
    const [dashboardTableArray, setDashboardArray] = useState(initliseDashboardArray(purchase_Order,
        (value: IPURCHASE_ORDER, i: number) => { setToDelete((prev: any) => value); setIndex((prev) => i); setDeleteDialogIsOpen(true); },
        navigate));
    const [searchParams, setSearchParams] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>()

    function updateArraythroughSearchParams(value: string): IPURCHASE_ORDER[] {

        let newArray: IPURCHASE_ORDER[] = []
        if (searchParams === '') return purchase_Order;
        purchase_Order.map((value: IPURCHASE_ORDER) => {
            if (
                value.to.name.toLowerCase().includes(searchParams.toLowerCase()) ||
                value.date.toLowerCase().includes(searchParams.toLowerCase()) ||
                value.total.toString().toLowerCase().includes(searchParams.toLowerCase()) ||
                value.po_NO.toLowerCase().includes(searchParams.toLowerCase())

            ) return newArray.push(value);

        })




        return newArray;
    }


    useEffect(() => {
        setDashboardArray(initliseDashboardArray(purchase_Order, (value: IPURCHASE_ORDER, i: number) => { setToDelete((prev: any) => value); setIndex((prev) => i); setDeleteDialogIsOpen(true); }, navigate));
    }, [purchase_Order])

    useEffect(() => {
        const time = setTimeout(() => {
            setDashboardArray(initliseDashboardArray(updateArraythroughSearchParams(searchParams), (value: IPURCHASE_ORDER, i: number) => { setToDelete((prev: any) => value); setIndex((prev) => i); setDeleteDialogIsOpen(true); }, navigate));
            setIsLoading(false)
        }, 1000);
        return () => clearTimeout(time);
    }, [searchParams])

    return (
        <>
            <PurchaseOrderDeleteDialog Data={toDelete} index={index} close={() => { setDeleteDialogIsOpen(false) }} isOpen={DeleteDialogIsOpen} key={`DeleteDialog`} />
            <div className='h-[15%] p-2 flex gap-2 '>
                <div className='border h-full w-[25%]'>
                    <input title='input' value={searchParams} onChange={(e) => { setIsLoading(true); setSearchParams(prev => e.target.value) }} placeholder='search with Invoice No, Billed to name date ' className='w-full h-full ' />
                </div>
                <div className='w-[8%] cursor-pointer hover:bg-gray-100  flex items-center border text-center place-content-center'>Search</div>
            </div>
            <div className='h-[80%] '>
                {
                    (!isLoading) ?
                        (purchase_Order.length !== 0) ?
                            <DashboardTable dataArray={dashboardTableArray.dataArray} headers={dashboardTableArray.headers}
                                onclick={dashboardTableArray.onclick} Buttons={dashboardTableArray.Buttons} />
                            : <div className='flex h-full w-full items-center place-content-center'>
                                Create Purchase Order To View Here
                            </div>
                        : <div className='flex h-full items-center place-content-center'>
                            Searching.....
                        </div>

                }
            </div>


        </>
    )
}

export default Table