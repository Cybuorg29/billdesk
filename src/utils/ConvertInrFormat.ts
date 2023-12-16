
export const converToInrFormat=(value:any)=>{
     
    if(value  === typeof NaN) return '0'

   value  =  value.toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'INR'
        })
        return value
    }   
