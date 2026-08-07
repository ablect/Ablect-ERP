import {

isDebitAccount

}

from "./isDebitAccount";

export function calculateNormalBalance(

type:

|"Asset"

|"Expense"

|"Liability"

|"Revenue"

|"Equity",

debit:number,

credit:number,

){

if(

isDebitAccount(

type,

)

){

return debit-credit;

}

return credit-debit;

}