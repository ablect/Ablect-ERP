import Button

from "../../../components/ui/Button";

type Props={

active:boolean;

onClick:()=>void;

};

export default function UserActivationButton({

active,

onClick,

}:Props){

return(

<Button

onClick={onClick}

>

{active

?

"Deactivate"

:

"Activate"}

</Button>

);

}