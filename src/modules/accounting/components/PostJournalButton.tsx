import Button

from "../../../components/ui/Button";

type Props={

onClick:()=>void;

disabled:boolean;

};

export default function PostJournalButton({

onClick,

disabled,

}:Props){

return(

<Button

onClick={onClick}

disabled={disabled}

>

Post Journal

</Button>

);

}