export function prepareExcelData(

items:any[],

){

return items.map(item=>({

Title:item.title,

Value:item.value,

}));

}