import { Dialog, DialogActions, DialogContentText } from '@mui/material'
import React, { useState } from 'react'
import Inputs from '../../../inventory/create/components/Inputs'
import { ITERMS } from '../../../../store/features/terms'
import { Input } from '@mui/joy'
import { SolidButton } from '../../../../components/ui/Buttons/solid/SolidButton'
import { toast } from 'react-toastify'
import { createTerm } from '../../../../store/actions/terms/create'

type Props = {scale:boolean,setScale:any}

const CreateNewTermsDialog = ({scale,setScale}: Props) => {

    const [pushValue,setPushValue] = useState<ITERMS>({
        id:'',
        name:'',
        terms:[]
    });
    function handleTermValueChange(e:React.ChangeEvent<HTMLInputElement>){
        let array = pushValue.terms;
         let index = parseInt(e.target.id) ;
         array[index] = e.target.value
         setPushValue((prev)=>{return{...prev,terms:array}}) 
        }
        function handleTermPush(){
            let array = pushValue.terms;
            array.push('');
            setPushValue((prev)=>{return{...prev,terms:array}}) 
    }
  return (
    <Dialog open={scale} fullScreen>
         <div className='pl-2 flex place-content-between  items-center'>
                <DialogContentText>Enter details</DialogContentText>
                <DialogActions><span className='text-xl cursor-pointer' onClick={() => { setScale(false) ;setPushValue({name:'',terms:[],id:''})}}>X</span></DialogActions>
            </div>
            <div className='p-5 w-[25%]'>
                <Inputs name='Term and Condition name' onchange={(e:React.ChangeEvent<HTMLInputElement>)=>{setPushValue((prev)=>{return{...prev,name:e.target.value}})}} type={'text'} value={pushValue.name} key={'asdad'}/>
            </div>
            <div className='p-5 flex flex-col gap-5'>
                {
                    pushValue.terms.map((index:string,i:number)=>{
                         let k = i;
                        return<div className='flex place-content-center gap-2 '>
                            <div className='flex items-center'>{++k}</div>
                        <Input id={`${i}`} className='w-full' value={index} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handleTermValueChange(e)}} />
                        </div>
                    })
                }
            </div>
            <div className='w-full p-5 flex place-content-center '>
                <div className='w-[80%] bg-blue-100 border-blue-500 border cursor-pointer text-center p-3  rounded-md' onClick={()=>{handleTermPush()}}>ADD LINE +</div>
            </div>
            <DialogActions>
                <SolidButton color='black' innerText='Save' onClick={()=>{createTerm(pushValue)}} />
                <SolidButton color='error' innerText='Cancel' onClick={()=>{setScale(false) ;setPushValue({name:'',terms:[],id:''})}} />
            </DialogActions>

    </Dialog>
  )
}

export default CreateNewTermsDialog