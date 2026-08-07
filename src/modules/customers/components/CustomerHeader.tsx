type Props={

title:string;

description:string;

};

export default function CustomerHeader({

title,

description,

}:Props){

return(

<div>

<h1 className="text-3xl font-bold">

{title}

</h1>

<p className="mt-2 text-slate-500">

{description}

</p>

</div>

);

}