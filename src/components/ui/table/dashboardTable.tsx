import React from 'react'
import { useNavigate } from 'react-router-dom'

export type DashboardTableProps = {
  headers: string[],
  dataArray: any[],
  onclick: any,
  Buttons?: React.ReactNode[]

}

const DashboardTable = ({ dataArray, headers, Buttons, onclick }: DashboardTableProps) => {
  return (
    <div className='h-full w-full '>
      <div className='border-t   w-full h-full overflow-auto' >
        <div className="flex flex-col" >
          <div className="">
            <div className="inline-block min-w-full ">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium border-neutral-500 uppercase sticky top-0">
                    <tr className="border-b border-neutral-500">
                      <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >#</th>
                      {
                        headers.map((index: string) => {
                          return <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >{index}</th>
                        })
                      }

                    </tr>
                  </thead>
                  <tbody>
                    {
                      dataArray.map((index: any, i: number) => {

                        return <tr className="border-b border-neutral-300 font-light hover:bg-slate-100 cursor-pointer" onClick={() => { onclick() }} >
                          <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' >{++i}</th>

                          {

                            Object.keys(index).map((value: any) => {
                              return <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' >{index[value]}</th>
                            })
                          }

                        </tr>

                      })
                    }

                    {
                      Buttons?.map((Index: any) => {
                        return <Index />
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default DashboardTable