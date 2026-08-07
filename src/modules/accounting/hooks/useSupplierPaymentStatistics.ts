import {

useSupplierPayments

}

from "./useSupplierPayments";

export function useSupplierPaymentStatistics(){

const{

payments,

}=

useSupplierPayments();

const totalPaid=

payments.reduce(

(sum,payment)=>

sum+payment.amount,

0,

);

return{

count:

payments.length,

totalPaid,

};

}