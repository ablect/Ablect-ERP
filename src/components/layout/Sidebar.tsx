import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  Warehouse,
  ShoppingCart,
  Users,
  Truck,
  BarChart3,
  Briefcase,
  Building2,
  Boxes,
  ClipboardList,
  UserCog,
  DollarSign,
  Settings,
} from "lucide-react";

import "./Sidebar.css";

export default function Sidebar() {

  return (

    <aside className="sidebar">

      <h2>ABLECT ERP</h2>

      <NavLink to="/">

        <LayoutDashboard size={18} />

        Dashboard

      </NavLink>

      <NavLink to="/products">

        <Package size={18} />

        Products

      </NavLink>

      <NavLink to="/inventory">

        <Warehouse size={18} />

        Inventory

      </NavLink>

<NavLink to="/purchases">
  <ClipboardList size={18} />
  Purchases
</NavLink>

<NavLink to="/warehouse">
  <Building2 size={18} />
  Warehouse
</NavLink>

<NavLink to="/stock">
  <Boxes size={18} />
  Stock
</NavLink>

<NavLink to="/users">
  <UserCog size={18} />
  Users
</NavLink>

<NavLink to="/hr">
  <Briefcase size={18} />
  HR
</NavLink>

<NavLink to="/payroll">
  <DollarSign size={18} />
  Payroll
</NavLink>
      <NavLink to="/sales">

        <ShoppingCart size={18} />

        Sales

      </NavLink>

      <NavLink to="/customers">

        <Users size={18} />

        Customers

      </NavLink>

      <NavLink to="/suppliers">

        <Truck size={18} />

        Suppliers

      </NavLink>

      <NavLink to="/reports">

        <BarChart3 size={18} />

        Reports

      </NavLink>

      <NavLink to="/settings">

        <Settings size={18} />

        Settings

      </NavLink>

    </aside>

  );

}