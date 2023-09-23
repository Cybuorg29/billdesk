import React from 'react'
import { ProductObj } from '../../../models/inventory/productModel'
import { converToInrFormat } from '../../../utils/ConvertInrFormat'
import { SolidButton } from '../Buttons/solid/SolidButton'
import useId from '@mui/material/utils/useId'
import { useNavigate } from 'react-router-dom'

type Props = {product:ProductObj}

const ProductCard = ({product}: Props) => {
    const ButtonKey = useId()
     const navigate = useNavigate();
  return (
    <div className='bg-component  shadow-lg hover:shadow-xl cursor-pointer hover:scale-105 duration-150 rounded-xl h-[100%] w-full border  ' 
    onClick={()=>{navigate(`/view/${product._id}/product`)}}>
      <div className='h-[50%] p-2' >
        <img src={product?.image} alt='Product' className='w-full h-full bg-blend-multiply' /> 
      </div>
      <div className='h-[50%] p-2 text-sm grid gap-3' >
        <div className='font-inclusive'>
            {product.description}
        </div>
        <div className='font-black text-lg'>
            {converToInrFormat(product?.rate)}/ <span className='text-grayFont font-mono'>{product.unit}</span> 
        </div>
         <div className='flex place-content-center text-sm' >
            <SolidButton color='primary' innerText='View Product' onClick={()=>{navigate(`/view/${product._id}/product`)}} key={ButtonKey}/>
         </div>

      </div>
    </div>
  )
}

export default ProductCard