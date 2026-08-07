import Button from "../../../components/ui/Button";

type Props={

onClick:()=>void;

};

export default function EditProductButton({

onClick

}:Props){

return(

<Button
onClick={onClick}
>

Edit

</Button>

);

}