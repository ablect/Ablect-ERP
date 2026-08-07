export function isDebitAccount(

type:

|"Asset"

|"Expense"

|"Liability"

|"Revenue"

|"Equity",

){

return(

type==="Asset"||

type==="Expense"

);

}