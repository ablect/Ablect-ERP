type Props={

placeholder:string;

}

export default function SearchBar({placeholder}:Props){

return(

<input

type="text"

placeholder={placeholder}

style={{

padding:12,

width:"100%",

marginBottom:20,

borderRadius:8,

border:"1px solid #ddd"

}}

/>

)

}