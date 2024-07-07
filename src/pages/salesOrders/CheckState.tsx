import React, { useEffect, useLayoutEffect } from 'react'
import { toast } from 'react-toastify'
import { useAppSelector } from '../../store/app/hooks'
import { initliseSalesOrdersAction } from '../../store/actions/salesOrders/action'

type Props = {
    children: React.ReactNode
}




const CheckState = ({ children }: Props): JSX.Element => {

    const { isLoaded, Sales_Orders } = useAppSelector(state => state.salesOrders)
    const { istoken, token } = useAppSelector(state => state.auth)

    useEffect(() => {
        if (!isLoaded) {
            initliseSalesOrdersAction()
        }
    }, [Sales_Orders, token])
    return (
        <div className='h-full w-full'>{children}</div>
    )
}

export default CheckState