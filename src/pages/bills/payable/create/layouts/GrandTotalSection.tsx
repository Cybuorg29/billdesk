import React from 'react'
import { converToInrFormat } from '../../../../../utils/ConvertInrFormat';
import { limitDecimalDigits } from '../../../../../utils/limitDecimalDigits';

type Props = { total: any, rroundOffNum: any, isRoundOff: any, setIsRoundOff: any, setRoundOffNum: any }

const GrandTotalSection = ({ isRoundOff, rroundOffNum, setIsRoundOff, total, setRoundOffNum }: Props) => {
    return (
        <div className=' h-full flex place-content-between pl-2 pr-3 bg-component mr-1 ml-1 rounded-lg '>
            <div className='text-lg text-grayFont'> Grand Total</div>
            <div className='flex gap-10'>
                <div >
                    <div className='flex gap-2'>
                        <input type='checkbox' title='RoundOff' onClick={() => { (isRoundOff) ? setIsRoundOff(false) : setIsRoundOff(true); setRoundOffNum(0) }} ></input>
                        <div>Round off({` ${limitDecimalDigits(rroundOffNum)}`})</div>
                    </div>
                </div>
                <div className=''>{converToInrFormat(total)}</div>
            </div>
        </div>
    )
}

export default GrandTotalSection