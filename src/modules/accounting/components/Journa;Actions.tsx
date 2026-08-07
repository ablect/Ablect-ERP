import Button

from "../../../components/ui/Button";

type Props={

onEdit:()=>void;

onDelete:()=>void;

onPost:()=>void;

};

export default function JournalActions({

onEdit,

onDelete,

onPost,

}:Props){

return(

<div className="flex gap-2">

<Button

onClick={onEdit}

>

Edit

</Button>

<Button

onClick={onDelete}

>

Delete

</Button>

<Button

onClick={onPost}

>

Post

</Button>

</div>

);

}