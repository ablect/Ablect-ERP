import { create }

from "zustand";

type ProductSelectionState={

selected:string[];

toggle:(

id:string,

)=>void;

clear:()=>void;

};

export const useProductSelectionStore=

create<ProductSelectionState>((set)=>({

selected:[],

toggle(id){

set(state=>{

const exists=

state.selected.includes(id);

return{

selected:exists

?state.selected.filter(

item=>item!==id,

)

:[

...state.selected,

id,

],

};

});

},

clear(){

set({

selected:[],

});

},

}));