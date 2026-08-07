import Card from "../../../components/ui/Card";

type Props={

title:string;

message:string;

};

export default function AIRecommendationCard({

title,

message,

}:Props){

return(

<Card>

<h3 className="font-semibold">

{title}

</h3>

<p className="mt-3 text-sm">

{message}

</p>

</Card>

);

}