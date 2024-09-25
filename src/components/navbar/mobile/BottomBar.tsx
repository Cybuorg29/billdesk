import React, { useState } from 'react'
import NavTab from './components/NavTab'
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import SideBar from './components/SideBar';
type Props = { open: () => void }

const BottomBar = ({ open }: Props) => {
    const [sideBarScale, setSideBarScale] = useState('scale-0')


    const navLine = [
        {
            name: 'Dashboard',
            icon: <GridViewRoundedIcon />,
            link: '/dashboard'
        },
        {
            name: "Invoice",
            link: "/invoices",
            icon: <DescriptionRoundedIcon />
        },
        {
            name: "Inventory",
            link: "/Inventory",
            icon: <InventoryRoundedIcon />
        },
        {
            name: 'Cash Flow',
            link: '/cash flow',
            icon: <AccountBalanceWalletRoundedIcon />

        },

    ]

    return (
        <div className={` h-full bg-black lg:hidden grid    w-full bottom-0   grid-cols-5    `} >

            {
                navLine.map((index) => {
                    return (
                        <>
                            <NavTab name={index.name} link={index.link} icon={index.icon} />
                        </>
                    )
                })
            }
            <div className='grid justify-items-center   items-center text-white ' onClick={() => { open() }} >
                <div>{<MoreHorizRoundedIcon />}</div>
                <div className='text-xs'  >{'More'}</div>
            </div>
        </div>
    )
}

export default BottomBar