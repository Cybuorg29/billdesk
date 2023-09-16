import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React, { useState } from 'react'
import Inputs from './Inputs'
import { SolidButton } from '../../../../components/ui/Buttons/solid/SolidButton'

type Props = {isAddSpec:boolean,setIsAddSpec:Function,push:Function}

const SpecDialog = ({isAddSpec,setIsAddSpec,push }: Props) => {
    const [pushSpec, setPushSpec] = useState({
        type: "",
        value: ""
      })

  return (
    <>
        <Dialog open={isAddSpec}>
                        <DialogTitle>Add Specification</DialogTitle>
                        <DialogContent>
                          <div className='grid gap-3'>
                            <Inputs name='Specification Type' onchange={(e:React.ChangeEvent<HTMLInputElement>)=>{setPushSpec((prev)=>{return{...prev,type:e.target.value}})}} type={'text'} value={pushSpec.type} key={'asdas'} />
                            <Inputs name='Specification'onchange={(e:React.ChangeEvent<HTMLInputElement>)=>{setPushSpec((prev)=>{return{...prev,value:e.target.value}})}} type={'text'} value={pushSpec.value} key={'asdas'} />                              
                          </div>
                        </DialogContent>
                        <DialogActions>
                          <div  className='grid grid-cols-2 gap-2' >
                          <SolidButton color='error' innerText='Cancel' onClick={() => { setIsAddSpec(false);setPushSpec({type:"",value:''}) }} key={'cancelSpecs'} />
                          <SolidButton color='black' innerText='Add' onClick={() => { setIsAddSpec(false) ; push(pushSpec);setPushSpec({type:'',value:''})}} key={'addSpecs'} />
                          </div>
                        </DialogActions>

                      </Dialog>
    </>
  )
}

export default SpecDialog