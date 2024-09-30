import React from "react";
import DashboardNav from "../components/DashboardNav";
import ConnectNav from "../components/ConnectNav";

function DashboardSeller() {
  return (
    <>
      <div className="container-fluid bg-secondary p-5">
        <ConnectNav />
      </div>

      <div className="container-fluid p-4">
        <DashboardNav />
      </div>

      <div className="container-fluid">
        <p>show all hotels user have posted </p>
      </div>
    </>
  );
}

export default DashboardSeller;
