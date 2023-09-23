
import  React  from 'react';
import Inputs from '../../../inventory/create/components/Inputs';

type props={
    Keys:string[],
    handleBankInput:Function,
    bankDetails:any

}
 const  BankInputs=({Keys,bankDetails,handleBankInput}:props)=> {
    return <>
      <div>
        <div className='text-xl font-poopins text-grayFont' > Bank Details</div>
        <div className='grid lg:grid-cols-3  md:grid-cols-2 gap-5 p-3' >
          {
            Keys.map((index: any) => {
              if (index === 'no') return <Inputs name={'A/C Number'} onchange={(e: React.ChangeEvent<HTMLInputElement>) => { handleBankInput(e) }} type={'text'} value={bankDetails[index]} key={index} />
              else return <>
                <Inputs name={index.toUpperCase()} onchange={(e: any) => { handleBankInput(e) }} type={'text'} value={bankDetails[index]} key={index} />
              </>
            })
          }

        </div>
      </div>
    </>
  }


  export default React.memo(BankInputs)
