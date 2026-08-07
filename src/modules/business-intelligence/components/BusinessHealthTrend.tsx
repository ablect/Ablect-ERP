type Props={

previous:number;

current:number;

};

export default function BusinessHealthTrend({

previous,

current,

}:Props){

const diff=current-previous;

return(

<p className="text-sm text-slate-500">

{diff>=0?"+":""}

{diff}

 points since last month

</p>

);

}