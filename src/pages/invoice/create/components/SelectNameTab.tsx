import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { JsxElement } from 'typescript'
import { userDetailSchema } from '../../../../models/userModel'
import { getStateCode } from '../../../../utils/getStateCode'

type Props = {
    keysArray: string[], valueArray: any, name: string, selectArray: any[], onSelect: (value: {
        adress: string,
        gstin: string,
        name: string,
        state_Code: number,
        state: string
    }) => void
}

const SelectNameTab = ({ keysArray, name, selectArray, valueArray, onSelect }: Props) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [scale, setScale] = useState('scale-0')

    // useEffect(() => {
    //     toast("change" + selectArray.length)
    // }, [valueArray, selectArray])

    return (
        <div className='h-full relative  w-full' onMouseOver={() => setScale('scale-100')} onMouseLeave={() => { setScale('scale-0') }} >



            <SelectDialog />
            <div className={`absolute bg-black/50 rounded-lg h-full w-full ${scale} flex place-content-center items-center text-white cursor-pointer`} onClick={() => { setOpenDialog(true); setScale('scale-0') }} >
                <div className='h-[40%] w-[60%]  flex place-content-center items-center text-white font-semibold '>Click to change</div>
            </div>

            <div className=' pl-2 place-content-between items-center pr-2 gap-2 h-full '>
                <div className='  text-md text-grayFont  '>{name}</div>
                <div >Name : {valueArray.name}</div>
                <div >GSTIN : {valueArray.gstin}</div>
            </div>

        </div>
    )


    function SelectDialog() {

        return <Dialog open={openDialog} fullWidth >
            <DialogContentText>
                <div className='flex place-content-between p-2'>
                    <div>Select To Insert</div>
                    <div className='cursor-pointer' onClick={() => { setOpenDialog(false); setScale('scale-0') }}>X</div>
                </div>
            </DialogContentText>
            <div className="min-w-full p-2">
                <div className="inline-block min-w-full ">
                    <div className="overflow-hidden">
                        {
                            (selectArray.length === 0) ? <div className='text-center'>no  clients to display . <span className='text-blue-700' >add</span> </div> :

                                <table className="min-w-full text-left  ">
                                    <thead className="border-b  text-small border-neutral-500 uppercase sticky top-0">
                                        <tr className="border-b border-neutral-500">
                                            <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >#</th>
                                            <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >Name</th>
                                            <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >GSTIN</th>
                                            <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >Adress</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            selectArray.map((index: userDetailSchema, i: number) => {
                                                return <>
                                                    <tr className='hover:bg-black/20 cursor-pointer p-2 rounded-lg border-b' onClick={() => { onSelect({ adress: `${index.adress + ' - ' + index.pincode}`, gstin: index.gstin, name: index.name, state: index.state, state_Code: getStateCode(index.state) }); setOpenDialog(false); setScale('scale-0') }}>
                                                        <th scope="col" className='px-3 py-4 font-source2 sticky text-gray-500 text-small  ' >{++i}</th>
                                                        <th scope="col" className='px-3 py-4 font-source2 sticky text-black text-small  ' >{index.name}</th>
                                                        <th scope="col" className='px-3 py-4 font-source2 sticky text-gray-500 text-small  ' >{index.gstin}</th>
                                                        <th scope="col" className='px-3 py-4 font-source2 sticky text-gray-500 text-small  ' >{index.adress + ' - ' + index.pincode}</th>

                                                    </tr>
                                                </>
                                            })
                                        }
                                    </tbody>
                                </table>
                        }
                    </div>
                </div>
            </div>


        </Dialog>

    }
}

export default SelectNameTab