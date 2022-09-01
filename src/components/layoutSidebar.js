import React from "react";
import Sidebar from "./shared/sidebar";

function LayoutSidebar({ children }) {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}

export default LayoutSidebar;
