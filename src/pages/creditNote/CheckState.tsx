import React, { useEffect } from 'react'
import { useAppSelector } from '../../store/app/hooks'
import { initliseCreditNoteAction } from '../../store/actions/creditNote/action'

type Props = {
    children: React.ReactNode
}

const CheckState = ({ children }: Props) => {
    const { auth, CreditNote } = useAppSelector(state => state)


    useEffect(() => {
        if (!CreditNote.isLoaded) initliseCreditNoteAction();
    }, [auth, CreditNote])


    return (
        <div className='h-full w-full'>{children}</div>
    )
}

export default CheckState