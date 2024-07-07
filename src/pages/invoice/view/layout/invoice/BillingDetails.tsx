import replaceUnderscoresWithSpaces from '../../../../../utils/removeUnderScore';

type Props = { array: any[] | any }

const BillingDetails = ({ array }: Props) => {
  const keys = Object.keys(array);

  return (
    <div className='w-full h-full   '>
      {
        keys.map((index: string, i: number) => {
          if (index === 'state_Code') return
          if (index === 'adress') {
            return <>
              <div className='flex  gap-5  grid-cols-2 pl-2 border-b-2    border-black text-sm  '>
                <div className=''>{replaceUnderscoresWithSpaces(index)}:</div>
                <div className=''>{array[index]}</div>
              </div>
            </>
          }
          if (index === 'state') return <>
            <div className='flex gap-5   w-full pl-2 border-b-2    border-black text-sm  '>
              <div className='grid gap-5 grid-cols-2 w-1/2'>
                <div className=''>{replaceUnderscoresWithSpaces(index)}</div>
                <div className='text-center'>{array[index]}</div>
              </div>
              <div className='grid grid-cols-2 '>
                <div className=''>{replaceUnderscoresWithSpaces(`code :`)}</div>
                <div className='text-center'>{array.state_Code}</div>
              </div>
            </div>
          </>
          if (i === 4 || i === 8) {
            return <div className='grid   grid-cols-2  pl-2 border-black text-sm  '>
              <div className=''>{replaceUnderscoresWithSpaces(index)} :</div>
              <div className=''>{array[index]}</div>
            </div>
          }
          return <>
            <div className='grid   grid-cols-2 pl-2 border-b-2    border-black text-sm  '>
              <div className=''>{replaceUnderscoresWithSpaces(index)} :</div>
              <div className=''>{array[index]}</div>
            </div>
          </>
        })
      }
    </div>
  )
}

export default BillingDetails