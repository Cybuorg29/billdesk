import React, { useEffect } from 'react'
import EmployeeList from './inputs/EmployeeList';
import ProductList from './inputs/ProductList';

type Props = {code:string,handleIdChange:any,value:string}

// this function returns extra input fields for expence page to generate  an  unique id related to  payment within the corporation 
// like adding stock to inventory and payments of employee to manage records


const ExtraInput = ({code,handleIdChange,value}: Props) => {


        useEffect(() => {
            
        }, [code])

        
       let obj:any = '';
     if(code==='400'){
        obj =  <EmployeeList handleChange={(id:any)=>{handleIdChange(id)}}  value={value}/>;
     }else if(code==='200'){
         obj = <ProductList handleChange={(id:any)=>{handleIdChange(id)}} value='' key={value} />
     }
     return obj
    

}

export default ExtraInput