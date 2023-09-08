import { Input } from '@mui/joy'
import { Button, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton'
import { addExpence } from '../../../store/actions/data/IncomeAndExpence/ExpenceActions'

import { useAppSelector } from '../../../store/app/hooks'

import { createDate } from '../../../utils/CreateDate'
import { removeZero } from '../../../utils/removeZeros'
import { validateNumberInput } from '../../../utils/validateNumberInput'
import ExtraInput from './components/ExtraInput'
import { useNavigate, useParams } from 'react-router-dom'
import { ExpenceCreateObj } from '../../../models/incomeAndExp/expenceInterface'
import AddStockDialog from '../../inventory/Add/AddStockDialog'

type Props = {}

const CreateExpence = (props: Props) => {
    const { token } = useAppSelector(state => state.auth)
         const {type} = useParams();
     const navigate = useNavigate();
     const [isPurchaseGoods,setIsPurchasedGoods] = useState(false)
    const [Expence, setExpence] = useState<ExpenceCreateObj>({  
        title: ``,
        // category consist of codes 
        category: '500',
        amount: 0,
        date: createDate(),
        Emp_id: '',
        token: token,
        uid:''
    })




    // handle the amount input value to not get zero 
    const handleAmountInput = (e: any) => {
        let amt = validateNumberInput(e.target.value)
        amt = removeZero(amt);
        setExpence({ ...Expence, amount: amt })

    }


    

    useEffect(() => {
         console.log(type)
        setExpence((prev:any)=>{return{...prev,category:type}})
  
    }, [type])
    

    return (
        <>
            <div className='font-semibold text-2xl text-grayFont p-5 ' >Create Expence</div>
        <div className='grid gap-5  rounded-xl p-5' >
            <div className='p-5 border rounded-xl bg-component ' >
                <div className='grid gap-3 w-1/2'>
                    <label>Expence Type</label>
                    <Select value={Expence.category} onChange={(e) => {navigate(`/create/${e.target.value}/expence`)}} >
                        <MenuItem value='400'>Salaries Paid </MenuItem>
                        <MenuItem value='300'>Purchase </MenuItem>
                        <MenuItem value='200'   >Purchase of Goods</MenuItem>
                        <MenuItem value='100'>Provision Paid</MenuItem>
                        <MenuItem value='600'>Tax Filled (other)</MenuItem>
                        <MenuItem value='700'>GST Filled</MenuItem>
                        <MenuItem value='500'>others</MenuItem>

                    </Select>
                </div>
                <div className='flex flex-wrap my-5 gap-4  mt-4' >
                    <div className='grid gap-3 w-1/2 ' >
                        <label>Title (Note)</label>
                        <Input value={Expence.title} onChange={(e) => { setExpence({ ...Expence, title: e.target.value }) }} />
                    </div>
                    <div className='grid gap-3 ' >
                        <label>Amount</label>
                        <Input type='number' value={Expence.amount} onChange={(e) => { handleAmountInput(e) }} />
                    </div>

                </div>
                    <div className='m-5' >
                    <AddStockDialog close={()=>{setIsPurchasedGoods(false)}} id={Expence.uid} open={isPurchaseGoods} key={'sdasd'} />
                    <ExtraInput   value={Expence.uid} code={Expence.category} handleIdChange={(value:any)=>{handleExtraInput(value)}} />

                    </div>
                <div>
                    {/* <Button color='info' variant='outlined' onClick={() => { ; addExpence(Expence) }} >Add Expence</Button> */}
                    <SolidButton color='black' innerText='Add Expence' onClick={() => { addExpence(Expence) }} />
                </div>
            </div>




        </div>
        </>

    )

     async function handleExtraInput(value:any) {
         
        setExpence((prev:any)=>{return{...prev,uid:value}});console.log('value',value)
         switch(Expence.category){
            case '200':
                setIsPurchasedGoods(true);
                
         }        
    }
}

export default CreateExpence