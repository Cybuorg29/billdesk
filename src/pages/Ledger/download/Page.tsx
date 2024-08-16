import React, { useEffect, useState } from 'react'
import { userDetailSchema } from '../../../models/userModel'
import { useAppSelector } from '../../../store/app/hooks'
import { Dialog } from '@mui/material'
import Table from '../view/layouts/Table'
import convertIsoDate from '../../../utils/convertIsoDates'
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton'

type Props = {
    account: string | undefined
    dates: {
        upper: string,
        lower: string
    }
    setDates: any
    targetref: any
    open: any
    close: any
    array: any
    print: any
}

const DownloadLedger = ({ account, dates, setDates, targetref, close, open, array, print }: Props) => {
    const [data, setData] = useState<userDetailSchema>()
    const { userData, connections } = useAppSelector(state => state);



    // useEffect(() => {
    //     const find = [...connections.connections.client, ...connections.connections.supplier].find((value: userDetailSchema) => value._id === id);
    //     if (find === -1) null;
    //     else {
    //         setData(find);
    //     }
    // }, [connections, id])

    useEffect(() => {
        const find = [...connections.connections.client, ...connections.connections.client].find((value: userDetailSchema) => value._id === account);
        if (find) setData(() => find);


    }, [account, dates, setDates, targetref, connections])


    return (
        <Dialog open={open} fullScreen className='p-5 bg-whitesmoke '>
            <div className='w-[100%] min-h-full p-5     '  >
                <div className='flex place-content-between'>
                    <div className='font-bold'>Preview</div>
                    <div className='text-xl cursor-pointer' onClick={() => { close() }}>X</div>
                </div>
                <div className='flex gap-5 h-full  w-full '>
                    <div className='h-full w-[85%] overflow-auto bg-component border-2 mb-2' >
                        <div className='p-5 w-full h-fit' ref={targetref} id='toPrint'>

                            <div className='w-[100%] min-h-full  border-black border-2  '  >
                                <div className='min-[15rem] border-b-2 border-black'>
                                    {
                                        (account === 'sales' || account === 'Purchase') ? <div className='font-semibold '>
                                            <div className='text-center'>Sales Ledger</div>
                                            <div className='text-center text-lg'>{userData.name}</div>
                                            <div className='text-center'>{userData.adress}</div>
                                            <div className='text-center'>{userData.gstin}</div>
                                            <div className='text-center'>{convertIsoDate(dates.upper).split('at')[0]} To {convertIsoDate(dates.lower).split('at')[0]}</div>
                                        </div> : <div style={{ minHeight: '10rem', border: '', display: 'flex' }}>
                                            <div style={{ width: '50%', fontFamily: 'fantasy', placeContent: 'center', display: 'grid' }}>
                                                <div className='text-start text-lg'>{userData.name}</div>
                                                <div className='text-start'>{userData.adress}</div>
                                                <div className='text-start'>{userData.gstin}</div>
                                            </div>
                                            <div style={{ width: '50%', fontFamily: 'fantasy', borderLeft: '2px solid black', paddingLeft: '2rem' }}>
                                                <div className='text-start w-full text-lg'>{'Ledger Account :'}</div>
                                                <div style={{ fontFamily: 'fantasy', placeContent: 'center', display: 'grid', }}>
                                                    <div className='text-start text-lg'>{data?.name}</div>
                                                    <div className='text-start'>{data?.adress}</div>
                                                    <div className='text-start'>{data?.gstin}</div>
                                                </div>
                                            </div>

                                        </div>
                                    }
                                </div>
                                <Table accountArray={array} account={account} dates={dates} setDates={setDates} targetref={'two'} />
                            </div>
                        </div>
                    </div>
                    <div className='w-[15%] bg-component border-2'>
                        <div className='h-[80%]'></div>
                        <div className='h-[20%] flex place-content-center'>
                            <SolidButton color='black' innerText='Download or Print' onClick={() => { print() }} />
                        </div>


                    </div>

                </div>
            </div>

        </Dialog>
    )
}

export default DownloadLedger