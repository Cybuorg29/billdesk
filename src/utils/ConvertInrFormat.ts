
export const converToInrFormat = (value: any) => {

    if (value === typeof NaN) return '0'
    if (value === undefined) return '0'
    if (value === typeof Number) value = `${value}`;
    console.log(value)
    value = value.toLocaleString('en-IN', {
        maximumFractionDigits: 2,
        style: 'currency',
        currency: 'INR'
    })
    return value
}   
