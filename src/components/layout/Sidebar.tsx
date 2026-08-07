import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  Warehouse,
  ShoppingCart,
  Users,
  Truck,
  BarChart3,
  Settings
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