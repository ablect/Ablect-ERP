type Props = {

value:string;

onChange:(value:string)=>void;

};

export default function ProductFilter({

value,

onChange

}:Props){

return(

<select

value={value}

onChange={(e)=>onChange(e.target.value)}

className="rounded-xl border px-4 py-3"

>

<option value="all">

All Brands

</option>

<option value="Ablect">

Ablect

</option>

<option value="Deye">

Deye

</option>

<option value="Felicity">

Felicity

</option>

<option value="Growatt">

Growatt

</option>

</select>

);

}