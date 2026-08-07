import {

LayoutDashboard,

Boxes,

Users,

ShoppingCart,

Package,

Settings,

} from "lucide-react";

import SidebarItem from "./SidebarItem";

import SidebarSection from "./SidebarSection";

export default function AppSidebar() {

  return (

    <aside className="w-72 border-r bg-white p-5">

      <SidebarSection title="Main">

        <SidebarItem

          icon={<LayoutDashboard size={18} />}

          label="Dashboard"

          active

        />

      </SidebarSection>

      <SidebarSection title="Operations">

        <SidebarItem

          icon={<Boxes size={18} />}

          label="Inventory"

        />

        <SidebarItem

          icon={<ShoppingCart size={18} />}

          label="Sales"

        />

        <SidebarItem

          icon={<Package size={18} />}

          label="Purchases"

        />

        <SidebarItem

          icon={<Users size={18} />}

          label="Customers"

        />

      </SidebarSection>

      <SidebarSection title="System">

        <SidebarItem

          icon={<Settings size={18} />}

          label="Settings"

        />

      </SidebarSection>

    </aside>

  );

}