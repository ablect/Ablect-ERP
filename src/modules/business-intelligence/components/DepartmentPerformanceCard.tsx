import Card from "../../../components/ui/Card";

const departments=[

  {

    name:"Sales",

    score:95,

  },

  {

    name:"Inventory",

    score:88,

  },

  {

    name:"Finance",

    score:91,

  },

  {

    name:"Procurement",

    score:84,

  },

];

export default function DepartmentPerformanceCard(){

  return(

    <Card className="rounded-2xl p-6">

      <h3 className="text-lg font-semibold">

        Department Performance

      </h3>

      <div className="mt-6 space-y-5">

        {

          departments.map((department)=>(

            <div key={department.name}>

              <div className="flex justify-between mb-2">

                <span>

                  {department.name}

                </span>

                <strong>

                  {department.score}%

                </strong>

              </div>

              <div className="h-3 rounded-full bg-gray-200">

                <div

                  className="h-full rounded-full bg-green-600"

                  style={{

                    width:`${department.score}%`

                  }}

                />

              </div>

            </div>

          ))

        }

      </div>

    </Card>

  );

}