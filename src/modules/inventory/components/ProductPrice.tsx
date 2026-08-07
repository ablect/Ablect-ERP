import {

formatCurrency

}

from "../utils/formatCurrency";

type Props = {

value: number;

};

export default function ProductPrice({

value,

}: Props) {

return (

<span className="font-semibold text-green-700">

{formatCurrency(value)}

</span>

);

}