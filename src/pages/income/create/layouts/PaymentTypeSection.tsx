import React, { useId } from 'react'
import SelectReceivedAs from '../components/SelectReceivedAs'
import Inputs from '../../../inventory/create/components/Inputs'
import { ICreateIncome } from '../../../../models/incomeAndExp/incomeInterface'

type Props = {value:ICreateIncome,set:any}

const PaymentTypeSection = ({set,value}: Props) => {
    const transactionIdKey = useId();

  return (
    <>
    <SelectReceivedAs value={value.receivedAs} set={set} />
    {
        (value.receivedAs === 'online') ?
            <Inputs name='Transaction/Referal Id ' onchange={(e: React.ChangeEvent<HTMLInputElement>) => { set((prev: any) => { return { ...prev, transactionId: e.target.value } }) }} type={typeof value.transactionId} value={value.transactionId} key={transactionIdKey} />
            : null
    }
    </>

  )
}

export default PaymentTypeSection