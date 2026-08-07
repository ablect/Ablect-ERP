type Props={

text:string;

onClick?:()=>void;

}

export default function PrimaryButton({text,onClick}:Props){

return(

<button

onClick={onClick}

style={{

padding:"12px 20px",

background:"#1d4ed8",

color:"white",

border:"none",

borderRadius:8,

cursor:"pointer"

}}

>

{text}

</button>

)

}