type Props={

date:Date;

};

export default function PurchaseDate({

date,

}:Props){

return(

<span>

{date.toLocaleDateString()}

</span>

);
}