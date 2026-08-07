type Props={

debit:number;

credit:number;

};

export default function JournalBalanceIndicator({

debit,

credit,

}:Props){

const balanced=

debit===credit;

return(

<div>

<p>

Debit:

₦{debit.toLocaleString()}

</p>

<p>

Credit:

₦{credit.toLocaleString()}

</p>

<p>

{

balanced

?"Balanced"

:"Not Balanced"

}

</p>

</div>

);

}