export const  removeZero =(value:number)=>{
     let numberWithoutZeros = parseFloat(value.toString().replace(/(\.\d*?[1-9])0+$/, '$1'));
  return numberWithoutZeros;

}