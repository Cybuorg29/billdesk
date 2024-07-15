import React, { useEffect, useId } from 'react'
import { useAppSelector } from '../../../../store/app/hooks'
import { getConnection } from '../../../../store/actions/connections/set';
import SelectINput from '../components/Select';

type Props = {
    value: string[],
    set: any
}

const SelectBillingInfo = ({ set, value }: Props) => {
    const { connections, isConnection } = useAppSelector(state => state.connections);
    useEffect(() => {
        if (!isConnection) getConnection();
    }, [isConnection, connections])


    const keys = {
        billedToInput: useId()
    }



    return (
        <>
            <div className='w-full h-full grid grid-cols-2 gap-3 p-3'>
                <div className='h-full'>
                    <SelectINput array={[...connections.client, ...connections.supplier].filter((v, i, a) => a.indexOf(v) === i)} name='Billed To' set={(value: any) => { console.log(value); set(value, 'to'); set(value, 'ship_To') }} value={value[0]} key={keys.billedToInput} />
                </div>
                <div className='h-full'>
                    <SelectINput array={[...connections.client, ...connections.supplier]} name='Shipped To' set={(value: any) => { console.log(value); set(value, 'ship_To') }} value={value[1]} key={keys.billedToInput} />
                </div>

            </div>
        </>
    )
}

export default SelectBillingInfo