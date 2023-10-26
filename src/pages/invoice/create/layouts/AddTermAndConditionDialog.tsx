import { Dialog, DialogActions, DialogContentText } from '@mui/material'
import React, { useEffect, useId, useState } from 'react'
import Inputs from '../../../inventory/create/components/Inputs'
import { Input } from '@mui/joy'
import { SolidButton } from '../../../../components/ui/Buttons/solid/SolidButton'
import { IcreateInvoice } from '../../../../models/invoice/invoice.model'
import { useAppSelector } from '../../../../store/app/hooks'
import { getTerms } from '../../../../store/actions/terms/set'
import { ITERMS } from '../../../../store/features/terms'
import CreateNewTermsDialog from '../components/CreateNewTermsDialog'

type Props = { open: boolean, setOpen: any, set: any, }

const AddTermAndConditionDialog = ({ open, setOpen, set }: Props) => {
    const { isLoaded, terms } = useAppSelector(state => state.Terms)
    const [value, setValue] = useState('')
    const addButtonKey = useId();
    const createNewButtonKey = useId();
    const  [createDialogScale,setCreateDialogScale] = useState<boolean>(false);
    function handlePush() {
        console.log('asdasd')
        set((prev: IcreateInvoice) => { return { ...prev, terms_And_Conditions: [...prev.terms_And_Conditions, value] } })
        setOpen(false);
        setValue('');
    }
    function handleSelectPush(value:any[]){
        set((prev: IcreateInvoice) => { return { ...prev, terms_And_Conditions: [...prev.terms_And_Conditions, ...value] } })
    }



    useEffect(() => {
        getTerms()
    }, [isLoaded])

    return (
        <Dialog open={open} fullWidth   >
            <CreateNewTermsDialog scale={createDialogScale} setScale={setCreateDialogScale} />
            <div className='pl-2 flex place-content-between  items-center'>
                <DialogContentText>Select to enter</DialogContentText>
                <DialogActions><span className='text-lg cursor-pointer' onClick={() => { setOpen(false) }}>X</span></DialogActions>
            </div>
            <div className='pl-2'>
                {
                    (terms.length === 0) ? <DialogContentText>No save terms and condition found</DialogContentText>
                        : <div>{
                            terms.map((index: ITERMS) => {
                                return <>
                                    <div className='p-2 hover:bg-black/20 cursor-pointer w-[90%] rounded-md' onClick={()=>{handleSelectPush(index.terms);setOpen(false)}}>{index.name}</div>
                                </>
                            })
                        }
                        </div>
                }
            </div>
            <div className='w-full h-full p-3'>
                <DialogContentText>Enter custom</DialogContentText>
                <Input variant='outlined' placeholder='enter custom term and condition' name='custom term' value={value} onChange={(e: any) => setValue(e.target.value)} />
            </div>
            <DialogActions>
                <SolidButton color='black' innerText='Add' onClick={handlePush} key={addButtonKey} />
                <DialogActions><SolidButton color='primary' innerText='Create new +' onClick={()=>{setCreateDialogScale(true)}} key={createNewButtonKey} /></DialogActions>

            </DialogActions>
        </Dialog>
    )
}

export default AddTermAndConditionDialog