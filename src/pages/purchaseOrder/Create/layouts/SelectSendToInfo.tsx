import React, { useEffect, useLayoutEffect, useState } from 'react'
import SelectBilledTo from '../components/SelectBilledTo'
import { useAppSelector } from '../../../../store/app/hooks'
import { getConnection } from '../../../../store/actions/connections/set'
import { userDetailSchema } from '../../../../models/userModel'

type Props = {
    values: any[]
    onchange: any
}

const SelectSendToInfo = ({ onchange, values }: Props) => {
    const { connections, isConnection } = useAppSelector(state => state.connections);
    const [selectedValue, setSelectedValue] = useState({
        to: -1,
        ship_To: -1
    });
    const [connectionList, setConnectionList] = useState<any[]>([])

    function initliseConnectionsArray(): userDetailSchema[] {

        const newArray: userDetailSchema[] = [];
        [...connections.client, ...connections.supplier].map((index: userDetailSchema) => {
            let found = false;
            if (newArray.length === 0) {
                return newArray.push(index)
            }
            newArray.map((user: userDetailSchema) => {
                if (user._id === index._id) {
                    found = true
                }
            })
            if (!found) {
                return newArray.push(index);
            }
            // toast('found')
            // newArray.push(index);
        })
        console.log(newArray)

        return newArray;


    }


    class pushObj {
        name = '';
        adress = ''
        gstin = ''
        phone = ''

        constructor(name: string, adress: string, gstin: string, phone: string) {
            this.name = name;
            this.adress = adress;
            this.gstin = gstin;
            this.phone = phone;
        }

    }


    function push(e: React.ChangeEvent<HTMLInputElement>, name: string) {


        const rawObj: userDetailSchema = [...connections.client, ...connections.supplier][parseInt(e.target.value)];
        // console.log(rawObj)
        if (name === 'to') {
            onchange(new pushObj(
                rawObj.name, rawObj.adress, rawObj.gstin, rawObj.phone
            ), 'ship_To');
            setSelectedValue((prev) => { return { ...prev, ship_To: parseInt(e.target.value) } })
        }
        onchange(new pushObj(
            rawObj.name, rawObj.adress, rawObj.gstin, rawObj.phone
        ), name);
        setSelectedValue((prev) => { return { ...prev, [name]: parseInt(e.target.value) } })
    }


    useEffect(() => {
        if (!isConnection) {
            getConnection();
        }
        setConnectionList((prev) => initliseConnectionsArray())
    }, [isConnection])

    useEffect(() => {
        console.log(selectedValue)
    }, [selectedValue])



    return (
        <>
            <div className='w-full h-full grid grid-cols-2 gap-5'>
                <SelectBilledTo name='To' arrayList={connectionList} onchange={(e: React.ChangeEvent<HTMLInputElement>) => { push(e, 'to') }} value={selectedValue.to} key={'any'} />
                {/* <SelectBilledTo name='Shipped To' arrayList={connectionList} onchange={(e: React.ChangeEvent<HTMLInputElement>) => { push(e, 'ship_To') }} value={selectedValue.ship_To} key={'any'} /> */}
            </div>
        </>
    )
}

export default SelectSendToInfo