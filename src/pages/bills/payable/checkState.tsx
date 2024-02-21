import React, { ReactNode, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks'
import { setPayablesAction } from '../../../store/actions/bills/payable'

type Props = {
    children: React.ReactNode
}


const CheckState: React.FC<Props> = ({ children }): JSX.Element => {

    const { auth, payables } = useAppSelector(state => state)


    useEffect(() => {
        if (!auth.istoken || payables.isLoaded) { }
        else setPayablesAction(new Date().getMonth() + 1)

    }, [auth.token, payables.isLoaded, payables.invoice])
    return (
        <>
            {children}
        </>
    )
}

export default CheckState