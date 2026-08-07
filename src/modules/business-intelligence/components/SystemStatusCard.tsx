import Card from "../../../components/ui/Card";

export default function SystemStatusCard() {

  return (

    <Card>

      <h3 className="text-lg font-semibold">

        System Status

      </h3>

      <div className="mt-6 space-y-4">

        <Status name="Database" value="Online" colour="green" />

        <Status name="Backup" value="Completed" colour="green" />

        <Status name="Sync" value="Active" colour="green" />

        <Status name="License" value="Valid" colour="green" />

      </div>

    </Card>

  );

}

function Status({

  name,

  value,

  colour,

}:{

  name:string;

  value:string;

  colour:"green"|"yellow"|"red";

}){

  return(

    <div className="flex justify-between">

      <span>{name}</span>

      <span className={`text-${colour}-600`}>

        {value}

      </span>

    </div>

  );

}