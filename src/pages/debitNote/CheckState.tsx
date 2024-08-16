import React, { useEffect } from 'react'
import { useAppSelector } from '../../store/app/hooks'
import { initliseDebitNote } from '../../store/actions/debitNote/action'

type Props = {
    children: React.ReactNode
}

const CheckState = ({ children }: Props): JSX.Element => {

    const { DebitNote, auth } = useAppSelector(state => state)
    // const { istoken, token } = useAppSelector(state => state.auth)

    useEffect(() => {
        if (!DebitNote.isLoaded) {
            initliseDebitNote()
        }
    }, [DebitNote, auth.token])
    return (
        <div className='h-full w-full'>{children}</div>
    )
}

export default CheckState