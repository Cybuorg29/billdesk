export const convertIncAndExpCode=(value:any)=>{
  switch (value) {
                                                                case '100': {
                                                                    value = 'Provision Paid';
                                                                    break;
                                                                }
                                                                case '200':
                                                                    value = 'purchase of Goods';
                                                                    break;
                                                                case '300':
                                                                    value = 'purchase';
                                                                    break;
                                                                case '400':
                                                                    value = 'Salaries';
                                                                    break;
                                                                case '500':
                                                                    value = 'others';
                                                                    break;
                                                           
                                                            }
                                                            return  value
}