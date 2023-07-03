
export const validateNumberInput=(value:any)=>{
    if (isNaN(value)||value==='NaN'||value==='') {
    value = 0;
  }

  return value
}