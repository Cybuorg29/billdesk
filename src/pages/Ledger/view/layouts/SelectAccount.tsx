import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../../../store/app/hooks'
import { getConnection } from '../../../../store/actions/connections/set'
import { connectionSchema } from '../../../../models/Client/Connection/ConnectionsModel'
import { userDetailSchema } from '../../../../models/userModel'

type Props = {
    open: boolean
    close: any
    set: any
    setName: any
}

const SelectAccount = (props: Props) => {

    const { incomeAndExpence, connections } = useAppSelector(state => state);
    const { expences, income, isExpences, isIncome } = incomeAndExpence
    const { client, supplier } = connections.connections
    const [ConnectionsArray, setConnectionsArray] = useState<userDetailSchema[]>(initliseConnectionsArray())


    useEffect(() => {
        if (!connections.isConnection) getConnection();
        else setConnectionsArray(initliseConnectionsArray());
    }, [connections.isConnection])

    function initliseConnectionsArray(): userDetailSchema[] {
        let array: userDetailSchema[] = []
        client.map((value: userDetailSchema) => {
            if (array.length === 0) array.push(value);
            else {
                const find = array.findIndex((cli) => cli._id === value._id);
                if (find === -1) array.push(value);
            }

        })
        supplier.map((value: userDetailSchema) => {
            if (array.length === 0) array.push(value);
            else {
                const find = array.findIndex((cli) => cli._id === value._id);
                if (find === -1) array.push(value);
            }

        })



        return array;

    }


    function Arraytab({ icon, name, value, str }: { icon: string, name: string, value: string, str: string }) {
        return <>
            <div className='flex gap-2  border cursor-pointer hover:bg-gray-200 p-2' onClick={() => { props.set(str); props.setName(value); props.close() }}  >
                <div>{icon}</div>
                <div>{name}</div>
            </div>
        </>
    }

    return (
        <div className={`  ${(props.open) ? 'w-[25%] h-[99%]' : 'w-0 h-0'}  duration-500 bg-component z-50 absolute shadow-lg right-0 `}>
            <div className='flex place-content-start '>
                <div className='cursor-pointer p-5 text-xl' onClick={() => props.close()} >X</div>
            </div>
            <div className='pl-4 mb-4'>Select a account to view</div>
            <div className='h-[90%] overflow-auto'>
                <Arraytab icon='' name='Sales' str='sales' value='sales' />
                <Arraytab icon='' name='Purchase' str='Purchase' value='Purchase' />
                {
                    ConnectionsArray.map((value: userDetailSchema) => {
                        return <Arraytab icon='' name={value.name} value={value.name} str={value._id} />
                    })

                }
            </div>

        </div>
    )
}

export default SelectAccount