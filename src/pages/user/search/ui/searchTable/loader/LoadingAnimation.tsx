import { Dialog, DialogTitle } from '@mui/material'
import React from 'react'
import LoaderHtml from './LoaderHtml'

type Props = {open:boolean}

const LoadingAnimation = ({open}: Props) => {
  return (
    <div className=' bg-white/70 absolute '>
        <Dialog  open={open} >
            <DialogTitle>
                 <LoaderHtml/>
            </DialogTitle>

        </Dialog>

    </div>
  )
}

export default LoadingAnimation