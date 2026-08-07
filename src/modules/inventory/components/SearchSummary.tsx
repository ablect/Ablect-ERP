type Props={

keyword:string;

};

export default function SearchSummary({

keyword

}:Props){

if(

!keyword

){

return null;

}

return(

<p className="text-xs text-slate-400">

Searching for

<b>

{" "}

{keyword}

</b>

</p>

);

}