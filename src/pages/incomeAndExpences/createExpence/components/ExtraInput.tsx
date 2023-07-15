import React, { useEffect } from 'react'
import EmployeeList from './inputs/EmployeeList';

type Props = {code:string}

// this function returns extra input fields for expence page to generate  an  unique id related to  payment within the corporation 
// like adding stock to inventory and payments of employee to manage records


const ExtraInput = ({code}: Props) => {


        useEffect(() => {
            
        }, [code])

        
       let obj:any = '';
     if(code==='400'){
        obj =  <EmployeeList/>;
     }
     return obj
    

}

export default ExtraInput