
export const converToInrFormat=(value:any)=>{
     
    if(value  === typeof NaN) return '0'
    if(value === typeof Number) value = `${value}`;

   value  =  value.toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'INR'
        })
        return value
    }   
