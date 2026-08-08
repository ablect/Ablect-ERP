import {
  Bell,
  Search,
  Settings,
  UserCircle2,
} from "lucide-react";

import "./Topbar.css";

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <h2>Ablect Business Suite ERP</h2>
      </div>

      <div className="topbar-search">
        <Search size={18} />

        <input
          type="text"
          placeholder="Search..."
        />
      </div>

      <div className="topbar-right">

        <button className="icon-btn">
          <Bell size={20} />
        </button>

        <button className="icon-btn">
          <Settings size={20} />
        </button>

        <div className="user-box">
          <UserCircle2 size={34} />

          <div>
            <strong>Administrator</strong>

            <p>Super Admin</p>
          </div>
        </div>

      </div>
    </header>
  );
}