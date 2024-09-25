import React, { useState } from 'react'
import Inputs from '../pages/inventory/create/components/Inputs'
import { Button } from '@mui/joy'
import { login } from '../api/userServices'
import { responceObj } from '../models/responce'
import { toast } from 'react-hot-toast'
import { actionPayload } from '../store/payload/payloadModel'
import { useDispatch } from 'react-redux'
import { saveToken } from '../store/features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { change } from '../store/features/loader/loaderSlice'

type Props = {}

const Login = (props: Props) => {
    const [UserData, setUserData] = useState({
        username: '',
        password: ''
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();


    async function signIN() {
        try {


            const log = await login(UserData.username, UserData.password);
            const res: any = log.data;
            console.log(res)
            if (res.code === 200) {
                toast.success(res.message)
                const payload: actionPayload = {
                    type: '',
                    data: {
                        token: res.token,
                        istoken: true
                    }
                }

                dispatch(saveToken(payload))
                navigate('/')
                dispatch(change())
            } else {
                console.log('asdasd')
                toast.error(res.message);
            }

        } catch (err: any) {
            toast.error(err.message)

        }
    }
    return (
        <div className='w-screen p-5 h-screen bg-white'>
            <div className='h-[20%] text-center text-4xl '>
                Audditx
                <div className='text-xl'>Sign In</div>
            </div>
            <div className='h-[70%] mt-4 p-4 grid grid-rows-4'>
                <div className='w-full h-full  p-4'>
                    <Inputs name='username' onchange={(e: any) => { setUserData((prev) => { return { ...prev, username: e.target.value } }) }} type={'text'} value={UserData.username} />
                </div>
                <div className='w-full h-full  p-4'>
                    <Inputs name='password' onchange={(e: any) => { setUserData((prev) => { return { ...prev, password: e.target.value } }) }} type={'text'} value={UserData.password} />
                </div>

                <div className='w-full h-full  p-4'>
                    <Button variant='outlined' className='w-full' onClick={() => { console.log(UserData); signIN() }}>Sign In</Button>
                </div>

            </div>

        </div>
    )
}

export default Login