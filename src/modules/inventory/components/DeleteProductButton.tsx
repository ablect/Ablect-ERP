import Button from "../../../components/ui/Button";

type Props={

onClick:()=>void;

};

export default function DeleteProductButton({

onClick

}:Props){

return(

<Button
onClick={onClick}
>

Delete

</Button>

);

}