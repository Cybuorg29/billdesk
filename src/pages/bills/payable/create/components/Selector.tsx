import { MenuItem, Select } from '@mui/material'
import React from 'react'
import { creatBilledFromObj } from '../functions/createBilledFrom'

type Props = {
    connectionsArray: any[],
    data: any,
    setData: any
}

const Selector = ({ connectionsArray, data, setData }: Props) => {
    return (
        <>
            <div className='text-end  w-[20%] h-full pr-3 flex items-center'>
                Billed From
            </div>
            <div className='w-[80%] h-full overflow-hidden'>
                <Select className='w-full h-full' value={data.billed_From.name}  >
                    {
                        connectionsArray.map((index: any) => {
                            return <MenuItem value={index?.name} onClick={() => { setData(((prev: any) => { return { ...prev, billed_From: creatBilledFromObj(index) } })) }}>{index.name}</MenuItem>
                        })
                    }
                </Select>

            </div>

            <div className='text-end  w-[20%] h-full pr-3 flex items-center'>
                P.O No
            </div>
            <div className='w-[80%] h-full overflow-hidden'>
                <Select className='w-full h-full' value={data.billed_From.name}  >
                    {

                    }
                </Select>

            </div>
        </>
    )
}

export default Selector