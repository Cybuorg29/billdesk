export const calculateTaxAmount = (amount: number, taxRate: number) => {

    return ((amount * taxRate) / 100) || 0



}