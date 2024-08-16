import React from 'react'
import { OptionTabsModel } from '../../models/Navbar/OptionBarTabs'
import OptionTabs from './components/optionBar/OptionTabs'
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ArticleIcon from '@mui/icons-material/Article';
import { MdOutlineDriveFolderUpload } from 'react-icons/md';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
type Props = { scale: { value: boolean, set: any } }

const OptionBar = ({ scale }: Props) => {
  const OptionTabArray: OptionTabsModel[] = [
    {
      name: 'Search Business',
      navigate: '/Search/user',
      icon: <ManageSearchIcon />,
      action: () => { scale.set(false) }
    },
    {
      name: 'Ledger',
      navigate: '/dashboard/ledger',
      icon: <ArticleIcon />,
      action: () => { scale.set(false) }
    },
    {
      name: 'Debit Note',
      icon: <MdOutlineDriveFolderUpload size={20} />,
      navigate: '/dashboard/debit note',
      action: () => scale.set(false)
    },
    {
      name: 'Credit Note',
      icon: <AssignmentReturnedIcon />,
      navigate: '/dashboard/credit note',
      action: () => scale.set(false)
    },
  ]
  return (
    <div className={`absolute  z-50  h-[99%]  ${(scale.value) ? 'w-[25%]' : 'w-0'} bg-white shadow-xl  border  duration-500 overflow-hidden  right-0`} >
      <div className='text-gray-500 p-4 text-xl' ><span className='cursor-pointer' onClick={() => scale.set(false)} >X</span></div>
      {
        OptionTabArray.map((index: OptionTabsModel, i: number) => {
          return <OptionTabs navigate={index.navigate} action={index.action} icon={index.icon} name={index.name} key={`${index.name}+$  {i}`} />
        })
      }
    </div>
  )


}

export default OptionBar