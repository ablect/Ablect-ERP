type Alert = {

  id: string;

  severity: "Critical" | "Warning" | "Info";

  message: string;

};

const alerts: Alert[] = [

  {

    id: "1",

    severity: "Critical",

    message: "Inventory value dropped below threshold.",

  },

  {

    id: "2",

    severity: "Warning",

    message: "Five customer invoices are overdue.",

  },

  {

    id: "3",

    severity: "Info",

    message: "Sales exceeded yesterday by 14%.",

  },

];

function badgeColour(level: Alert["severity"]) {

  switch (level) {

    case "Critical":

      return "bg-red-100 text-red-700";

    case "Warning":

      return "bg-yellow-100 text-yellow-700";

    default:

      return "bg-blue-100 text-blue-700";

  }

}

export default function ExecutiveAlerts() {

  return (

    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <h3 className="text-lg font-semibold">

        Executive Alerts

      </h3>

      <div className="mt-6 space-y-4">

        {

          alerts.map((alert) => (

            <div

              key={alert.id}

              className="flex items-center justify-between"

            >

              <span>

                {alert.message}

              </span>

              <span

                className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeColour(alert.severity)}`}

              >

                {alert.severity}

              </span>

            </div>

          ))

        }

      </div>

    </div>

  );

}