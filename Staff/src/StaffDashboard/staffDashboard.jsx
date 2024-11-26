import React from "react";
import { NavLink } from "react-router-dom";
import "./staffDashboard.css";
import approveMemIcon from "../assets/approve membership.png";
import bookApprovalIcon from "../assets/book approval.png";
import genReportIcon from "../assets/generate reports.png";
import bookReqIcon from "../assets/handle book request.png";

function StaffDashboard() {
  return (
    <div className="staff-dashboard">
      <h2>Staff Dashboard</h2>
      <div className="functionalities">
        <div className="card">
          <img src={bookApprovalIcon} alt="Book Issue Approval" />
          <NavLink to="/book-issue-approval">
            <h3>Book Issue Approval</h3>
          </NavLink>
        </div>
        <div className="card">
          <img src={genReportIcon} alt="Generate Reports"/>
          <NavLink to="/generate-report">
              <h3>Generate Reports</h3>
          </NavLink>  
        </div>
        <div className="card">
          <img src={bookReqIcon} alt="Handle Book Requests" />
          <NavLink to="/handle-book-requests">
            <h3>Handle Book Requests</h3>
          </NavLink>
        </div>
        <div className="card center-card">
          <img src={approveMemIcon} alt="Approve Memberships" />
          <NavLink to="/approve-memberships">
            <h3>Approve Memberships</h3>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default StaffDashboard;
