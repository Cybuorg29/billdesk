import React, { useState, useEffect } from 'react'
// import { colorArray } from '../ColorArray'

type Props = { color: 'primary'| 'black'|'error', innerText: string, onClick: any }


export const SolidButton = ({ innerText, color, onClick }: Props) => {
    const [varient, setVarient]: any = useState({
        name: '',
        color: 'bg-black',
        text: 'text-white'
    })
    const colorArray = [
        {
            name: "primary",
            color: "bg-blue-700",
            text: "text-white",
        },
        {
            name: 'black',
            color: 'bg-black',
            text: 'text-white'
        },
        {
            name: 'error',
            color: 'bg-red-700',
            text: 'text-white'
        }

    ];


    const set = () => {
        colorArray.map((index: any, i: number) => {
            if (index.name === color) {
                setVarient(index)
            }

        })

    }
    useEffect(() => {
        set()

    }, [])



    return (
        <div>
            <button type="button" className={`${varient?.text} ${varient?.color}  focus:ring-4  font-medium rounded-lg text-sm px-4 py-2 mr-2 mb-2  focus:outline-none  `} onClick={() => { onClick() }}   >{innerText}</button>
        </div>
    )
}

