type Props = {

page:string;

};

export default function Breadcrumb({

page,

}:Props){

return(

<p className="text-sm text-slate-500">

Dashboard /

<span className="font-semibold text-slate-700">

 {page}

</span>

</p>

);

}