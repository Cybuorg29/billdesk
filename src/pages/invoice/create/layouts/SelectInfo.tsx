import React, { useEffect } from 'react'
import SelectNameTab from '../components/SelectNameTab'
import { IcreateInvoice } from '../../../../models/invoice/invoice.model'
import { useAppSelector } from '../../../../store/app/hooks'
import { getConnection } from '../../../../store/actions/connections/set'
import { toast } from 'react-toastify'

type Props = { invoice: IcreateInvoice, setInvoice: any }

const SelectInfo = ({ invoice, setInvoice }: Props) => {
    const { connections, isConnection } = useAppSelector(state => state.connections)
    const { client, supplier } = connections
    const billed_To_Keys = Object.keys(invoice.billed_To)
    const shipped_To_keys = Object.keys(invoice.shipped_To)

    // useEffect(() => {
    //     if (!isConnection) getConnection();
    //     toast('conn' + client.length)
    // }, [])
    return (
        <>
            <div className='h-full  w-full bg-component  border-2   flex place-content-center'>
                <SelectNameTab valueArray={invoice.billed_To} name='Billed To' keysArray={billed_To_Keys} selectArray={[...client, ...supplier]} onSelect={(value: {
                    name: string,
                    gstin: string,
                    adress: string,
                    state: string
                    state_Code: number,
                }) => {
                    setInvoice((prev: any) => {
                        return {
                            ...prev, billed_To: { adress: value.adress, gstin: value.gstin, name: value.name, state: value.state, state_Code: value.state_Code }, shipped_To: {
                                adress: value.adress, gstin: value.gstin, name: value.name, state: value.state, state_Code: value.state_Code
                            }
                        }
                    })
                }} />
            </div>
            <div className=' w-full bg-component  ' >
                <SelectNameTab valueArray={invoice.shipped_To} name='Shipped To' keysArray={shipped_To_keys} selectArray={[...client, ...supplier]} onSelect={(value: {
                    name: string,
                    gstin: string,
                    adress: string,
                    state: string
                    state_Code: number,
                }) => {
                    setInvoice((prev: any) => {
                        return {
                            ...prev, shipped_To: {
                                adress: value.adress, gstin: value.gstin, name: value.name, state: value.state, state_Code: value.state_Code
                            }
                        }
                    })
                }} />
            </div>
        </>
    )
}

export default SelectInfo