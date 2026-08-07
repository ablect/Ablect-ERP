type Props={

title:string;

value:string;

};

export default function InventoryStatCard({

title,

value

}:Props){

return(

<div className="rounded-2xl bg-white p-6 shadow">

<p className="text-gray-500">

{title}

</p>

<h2 className="text-3xl font-bold mt-2">

{value}

</h2>

</div>

);

}