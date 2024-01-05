import React, { useEffect, useId } from 'react'
import EmployeeList from './inputs/EmployeeList';
import ProductList from './inputs/ProductList';
import SupplierList from './inputs/SupplierList';

type Props = { code: string, handleIdChange: any, value: string }

// this function returns extra input fields for expence page to generate  an  unique id related to  payment within the corporation 
// like adding stock to inventory and payments of employee to manage records


const ExtraInput = ({ code, handleIdChange, value }: Props) => {

  const keys = {
    EmployeeList: useId(),
    ProductList: useId(),
  }



  useEffect(() => {

  }, [code])


  let obj: any = '';
  if (code === '400') {
    obj = <EmployeeList handleChange={(id: any) => { handleIdChange(id) }} value={value} key={keys.EmployeeList} />;
  } else if (code === '200') {
    obj = <div className='grid grid-cols-2 gap-5'>
      <ProductList handleChange={(id: any) => { handleIdChange(id) }} value={value} key={keys.ProductList} />
    </div>
  }
  return obj


}

export default ExtraInput