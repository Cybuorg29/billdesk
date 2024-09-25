import React, { useEffect, useLayoutEffect } from 'react'
import { useAppSelector } from '../store/app/hooks'
import { Outlet, useNavigate } from 'react-router-dom'
import Topbar from '../components/navbar/Topbar'
import BottomBar from '../components/navbar/mobile/BottomBar'
import { checkUserLogin } from '../store/actions/user/user'

type Props = {}

const MainLayoutMobile = (props: Props) => {
    const { istoken, token } = useAppSelector(state => state.auth)
    const navigate = useNavigate()
    useLayoutEffect(() => {
        // if (!istoken)  navigate('/login');
        checkUserLogin()
    }, [istoken, token])


    return (
        <div className='w-screen h-screen '>
            <div className='h-[8%]   w-full'>
                <Topbar optionBarScale={false} setOptionBarScale={() => { }} />
            </div>
            <div className='h-[84%] bg-mobileBackground'>
                <Outlet></Outlet>
            </div>




            <div className='h-[8%] w-full bg-black'>
                <BottomBar open={() => { }} />
            </div>

        </div>
    )
}

export default MainLayoutMobile