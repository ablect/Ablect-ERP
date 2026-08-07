type Activity = {

  id: string;

  title: string;

  description: string;

  time: string;

};

const activities: Activity[] = [

  {
    id: "1",
    title: "Large Sale",
    description: "Invoice INV-1045 worth ₦250,000 completed.",
    time: "10 mins ago",
  },

  {
    id: "2",
    title: "Inventory Alert",
    description: "Coca-Cola stock dropped below reorder level.",
    time: "30 mins ago",
  },

  {
    id: "3",
    title: "Supplier Payment",
    description: "₦420,000 transferred to Nestle Nigeria.",
    time: "1 hour ago",
  },

  {
    id: "4",
    title: "New Customer",
    description: "One new customer account created.",
    time: "Today",
  },

];

export default function ExecutiveActivityTimeline() {

  return (

    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <h3 className="text-lg font-semibold">

        Recent Activity

      </h3>

      <div className="mt-6 space-y-5">

        {

          activities.map((activity) => (

            <div
              key={activity.id}
              className="border-l-2 border-blue-600 pl-4"
            >

              <h4 className="font-medium">

                {activity.title}

              </h4>

              <p className="text-sm text-gray-600 mt-1">

                {activity.description}

              </p>

              <p className="text-xs text-gray-400 mt-2">

                {activity.time}

              </p>

            </div>

          ))

        }

      </div>

    </div>

  );

}