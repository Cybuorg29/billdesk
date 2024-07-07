import React, { useEffect } from 'react'
import { useAppSelector } from '../../store/app/hooks'
import { initlisePurchaseOrder } from '../../store/actions/purchaseOrder/action'
import { toast } from 'react-toastify'

type Props = {
    children: React.ReactNode
}

const CheckState = ({ children }: Props): JSX.Element => {

    const { auth, po } = useAppSelector(state => state)

    useEffect(() => {
        if (!po.isLoaded) {
            initlisePurchaseOrder();
        }
    }, [po.isLoaded, auth.istoken])

    useEffect(() => {
        toast.success('Purchase Orders Updated ')
    }, [po.purchase_Order])

    return (
        <>
            {children}
        </>

    )
}

export default CheckState