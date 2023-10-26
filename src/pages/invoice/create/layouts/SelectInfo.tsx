import React from 'react'
import SelectNameTab from '../components/SelectNameTab'
import { IcreateInvoice } from '../../../../models/invoice/invoice.model'
import { useAppSelector } from '../../../../store/app/hooks'

type Props = { invoice: IcreateInvoice, setInvoice: any }

const SelectInfo = ({ invoice, setInvoice }: Props) => {
    const { client } = useAppSelector(state => state.connections).connections;
    const billed_To_Keys = Object.keys(invoice.billed_To)
    const shipped_To_keys = Object.keys(invoice.shipped_To)
    return (
        <>
            <div className='h-full  w-full bg-component rounded-lg flex place-content-center'>
                <SelectNameTab valueArray={invoice.billed_To} name='Billed To' keysArray={billed_To_Keys} selectArray={client} onSelect={(value: {
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
            <div className=' w-full bg-component rounded-lg' >
                <SelectNameTab valueArray={invoice.shipped_To} name='Shipped To' keysArray={shipped_To_keys} selectArray={client} onSelect={(value: {
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