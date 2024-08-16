import { useEffect } from "react"
import { useAppSelector } from "../../store/app/hooks"
import { toast } from "react-toastify"

type Props = {
    children: React.ReactNode
}

const CheckState = ({ children }: Props): JSX.Element => {

    const { auth, po } = useAppSelector(state => state)

    useEffect(() => {

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