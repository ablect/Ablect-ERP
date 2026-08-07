export function calculateNetSalary(

basicSalary:number,

allowance:number,

deduction:number,

tax:number,

){

return(

basicSalary+

allowance-

deduction-

tax

);

}