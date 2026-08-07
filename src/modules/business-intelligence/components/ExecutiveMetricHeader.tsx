type Props={

title:string;

subtitle?:string;

};

export default function ExecutiveMetricHeader({

title,

subtitle,

}:Props){

return(

<div>

<h2 className="text-xl font-bold">

{title}

</h2>

{

subtitle&&(

<p className="text-sm text-slate-500">

{subtitle}

</p>

)

}

</div>

);

}