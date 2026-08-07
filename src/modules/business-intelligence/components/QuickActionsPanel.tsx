import Card from "../../../components/ui/Card";

const actions = [

  "Create Sale",

  "Create Purchase",

  "Add Customer",

  "Add Product",

  "Record Expense",

];

export default function QuickActionsPanel(){

  return(

    <Card>

      <h3 className="text-lg font-semibold">

        Quick Actions

      </h3>

      <div className="mt-5 grid grid-cols-2 gap-3">

        {

          actions.map(action=>(

            <button

              key={action}

              className="rounded-xl border p-3 hover:bg-slate-100"

            >

              {action}

            </button>

          ))

        }

      </div>

    </Card>

  );

}