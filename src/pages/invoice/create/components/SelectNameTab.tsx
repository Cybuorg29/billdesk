import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React, { useState } from 'react'
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

    return (
        <div className='h-full relative ' onMouseOver={() => setScale('scale-100')} onMouseLeave={() => { setScale('scale-0') }} >
                 
            <SelectDialog />
            <div className={`absolute bg-black/20 h-full w-full ${scale} flex place-content-center items-center text-white cursor-pointer`} onClick={() => { setOpenDialog(true);setScale('scale-0') }} >
                <div className='h-[40%] w-[60%] border-2 border-dashed border-white flex place-content-center items-center text-white '>+</div>
            </div>
                <div className='border-b pl-2 text-lg text-grayFont h-[20%]'>{name}</div>
            <div className='grid  grid-rows-4 h-[80%]'>
                {
                    keysArray.map((index) => {
                        if(index==='state_Code') return  <div className='flex border-b pl-2 gap-4'>
                        <div className=''>{`Code : `}</div>
                        <div className='text-gray-600'>{valueArray[index]}</div>
                    </div>
                            return <>
                            <div className='flex border-b pl-2 gap-4' >
                                <div className=''>{index} : </div>
                                <div className='text-gray-600'>{valueArray[index]}</div>
                            </div>
                        </>
                        
                    })
                }
            </div>
        </div>
    )


    function SelectDialog() {

        return <Dialog open={openDialog} fullWidth className='h-full w-full'>
            <DialogTitle>
                <div className='flex place-content-between'>
                    <div>Select To Insert</div>
                    <div className='cursor-pointer' onClick={() => setOpenDialog(false)}>X</div>
                </div>
            </DialogTitle>
            <DialogContent>
                <div className='w-full h-[70%]'>
                    {
                        selectArray.map((index: userDetailSchema) => {
                            return <>
                                <div className='hover:bg-black/20 cursor-pointer p-2 rounded-lg border' onClick={()=>{onSelect({adress:`${index.building + ',' + index.city + ',' + index.district + ',' + index.state + ' - ' + index.pincode}`,gstin:index.gstin,name:index.name,state:index.state,state_Code:getStateCode(index.state)});setOpenDialog(false)}}>
                                    <div className='border-b grid grid-cols-2'>
                                        <div className='text-gray-600'><span className='text-black '>Name : </span>
                                            {index.name}</div>
                                        <div className='text-gray-600'><span className='text-black '>GSTIN : </span>
                                            {index.name}</div>
                                    </div>
                                    <div className='text-gray-600'><span className='text-black'>Adress : </span>{index.building + ',' + index.city + ',' + index.district + ',' + index.state + ' - ' + index.pincode}</div>
                                </div>
                            </>
                        })
                    }
                </div>
            </DialogContent>


        </Dialog>

    }
}

export default SelectNameTab