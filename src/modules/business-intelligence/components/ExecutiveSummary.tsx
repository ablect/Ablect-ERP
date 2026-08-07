import BusinessHealthCard from "./BusinessHealthCard";

type Props={

  score:number;

};

export default function ExecutiveSummary({

  score,

}:Props){

  return(

    <BusinessHealthCard

      score={score}

      lastUpdated={new Date().toLocaleString()}

    />

  );

}