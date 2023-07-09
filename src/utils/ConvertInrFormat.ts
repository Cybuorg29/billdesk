
export const converToInrFormat=(value:any)=>{

   value  =  value.toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'INR'
        })
        // toast.success(value)
        return value
    }   
