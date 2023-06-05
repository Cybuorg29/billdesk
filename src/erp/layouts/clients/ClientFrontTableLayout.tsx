import React from 'react'

type Props = {}

const ClientFrontTableLayout = (props: Props) => {
  return (
    <div className='' >
        <table  className='w-full  table-auto ' >
            <thead  className='bg-gray-900 text-white' >
                <tr   >
                    <th className='lg:p-3 p-2 ' >#</th>
                    <th className='lg:p-3 p-2 ' >Client Name</th>
                    <th className='lg:p-3 p-2 ' >Balance</th>
                    <th className='lg:p-3 p-2 ' >View</th>
                </tr>
            </thead>
        <tbody>
            <tr className='bg-slate-50 border ' >
                <th className='p-2' >1</th>
                <th className='p-2' >Aditya</th>
                <th className='p-2' >30000</th>
            </tr>
        </tbody>

        </table>
    </div>
  )
}

export default ClientFrontTableLayout