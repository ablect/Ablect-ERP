import KPIStatCard from "./KPIStatCard";

export default function ExecutiveAnalyticsGrid() {

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      <KPIStatCard

        title="Revenue"

        value="₦4,850,000"

        trend={[5, 7, 8, 6, 9, 11, 12]}

        comparison={{

          current: 4850000,

          previous: 4320000,

          change: 530000,

          changePercent: 12.4,

          trend: "up",

        }}

      />

      <KPIStatCard

        title="Profit"

        value="₦1,250,000"

        trend={[2, 3, 4, 4, 5, 6, 8]}

        comparison={{

          current: 1250000,

          previous: 1156000,

          change: 94000,

          changePercent: 8.1,

          trend: "up",

        }}

      />

      <KPIStatCard

        title="Customers"

        value="1,845"

        trend={[30, 34, 40, 42, 48, 52, 61]}

        comparison={{

          current: 1845,

          previous: 1744,

          change: 101,

          changePercent: 5.8,

          trend: "up",

        }}

      />

      <KPIStatCard

        title="Inventory"

        value="₦8,300,000"

        trend={[8, 8, 7, 6, 7, 7, 8]}

        comparison={{

          current: 8300000,

          previous: 8520000,

          change: -220000,

          changePercent: -2.6,

          trend: "down",

        }}

      />

    </div>

  );

}