export function preparePdfData(

items:any[],

){

return items.map(item=>([

item.title,

item.value,

]));

}