interface Props {

status:"Active"|"Inactive"|"Low Stock";

}

export default function StatusBadge({

status

}:Props){

const colors={

Active:"bg-green-100 text-green-700",

Inactive:"bg-slate-200 text-slate-700",

"Low Stock":"bg-red-100 text-red-700"

};

return(

<span

className={`px-3 py-1 rounded-full text-sm ${colors[status]}`}

>

{status}

</span>

);

}