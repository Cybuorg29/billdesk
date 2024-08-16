import { getStateCode } from '../../../../../utils/getStateCode';
import replaceUnderscoresWithSpaces from '../../../../../utils/removeUnderScore';

type Props = { array: any[] | any }

const BillingDetails = ({ array }: Props) => {
  const keys = Object.keys(array);

  return (
    <div className='flex flex-col  h-fit  '>
      {/* {
        keys.map((index: string, i: number) => {
          if (index === 'state_Code') return
          // if (index === 'adress') {
          //   return <>
          //     <div className='flex  gap-5  grid-cols-3 pl-2 border-b-2    border-black text-sm  '>
          //       <div className=''>{replaceUnderscoresWithSpaces(index)}:</div>
          //       <div className='text-start'>{array[index]}</div>
          //     </div>
          //   </>
          // }
          if (index === 'state') return <>
            <div className='flex gap-5   w-full pl-2 border-b-2    border-black text-sm  '>
              <div className='grid gap-5 grid-cols-2 cols-span-2'>
                <div className=''>{replaceUnderscoresWithSpaces(index)}</div>
                <div className='text-center'>{array[index]}</div>
              </div>
              <div className='grid grid-cols-2 '>
                <div className=''>{replaceUnderscoresWithSpaces(`code :`)}</div>
                <div className='text-center'>{getStateCode(array.state)}</div>
              </div>
            </div>
          </>
          // if (  i === keys.length - 1) {
          //   return <div className='grid   grid-cols-2  pl-2 border-black text-sm  '>
          //     <div className=''>{replaceUnderscoresWithSpaces(index)} :</div>
          //     <div className='text-start'>{array[index]}</div>
          //   </div>
          // }
          return <>
            <div className='grid   grid-cols-3 pl-2 border-b-2    border-black text-sm  '>
              <div className='col-span-1'>{replaceUnderscoresWithSpaces(index)} :</div>
              <div className='text-start col-span-2'>{array[index]}</div>
            </div>
          </>
        })
      }  */}
      <div className='flex flex-col'>
        <div className='grid   grid-cols-3 pl-2 border-b-2    border-black text-sm  '>
          <div className='col-span-1'>Name :</div>
          <div className='text-start col-span-2'>{array.name}</div>
        </div>

        <div className='grid   grid-cols-3 pl-2 border-b-2    border-black text-sm  '>
          <div className='col-span-1'>Adress :</div>
          <div className='text-start col'>{array.adress}</div>
        </div>

        <div className='grid   grid-cols-3 pl-2 border-b-2    border-black text-sm  '>
          <div className='col-span-1'>gstin :</div>
          <div className='text-start col-span-2'>{array.gstin}</div>
        </div>

        <>
          <div className='flex gap-5   w-full pl-2 border-b-2    border-black text-sm  '>
            <div className='grid gap-5 grid-cols-2 cols-span-2'>
              <div className=''>State :</div>
              <div className='text-center'>{array.state || ''}</div>
            </div>
            <div className='grid grid-cols-2  '>
              <div className=''>{replaceUnderscoresWithSpaces(`code :`)}</div>
              <div className='text-center'>{getStateCode(array.state)}</div>
            </div>
          </div>
        </>
      </div>
    </div>
  )
}

export default BillingDetails