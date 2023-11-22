import React, { useState } from 'react'
import { createProductObj } from '../../../models/inventory/productModel'
import { Dialog } from '@mui/material'

type Props = {}

const editDialog = (props: Props) => {
    const [product, setProduct]: any = useState<createProductObj>({  // basic array stores values of of product data 
        name: '',
        category: 'Finished Goods',
        code: '',
        description: '',
        image: '',
        limit: 0,
        rate: 0,
        unit: 0,
        stock: 0,
        tax: [],
        specifications: [],
        weight:0
      })
  return (
    <Dialog open={true}>
          
        <div className='' >
        </div>
    </Dialog>
  )
}

export default editDialog