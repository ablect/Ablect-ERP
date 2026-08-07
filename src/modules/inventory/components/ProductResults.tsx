type Props={

count:number;

};

export default function ProductResults({

count

}:Props){

return(

<p className="text-sm text-slate-500">

{count} products found

</p>

);

}