import React, { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SideBarDashboard = () => {
  const redirect = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('Admin-ID') && !localStorage.getItem("Admin-Name")) {
      redirect("/adminLogin");
      toast.error("Please Try Again!!")
      console.log("error 123 : ");
    }
  })
  const handleLogOut = () => {
    toast.error("You Logged Out");
    localStorage.removeItem("Admin-ID");
    localStorage.removeItem("Admin-Name");
    console.log("Log Out Clicked");
    redirect('/adminLogin');
  };
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark p-3">
        <div className="container-fluid">
          <Link to="/dashboard" className="navbar-brand text-danger">
            Dashboard
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/reports">
                  View Reports
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/sales-analytics">
                  Sales Analytics
                </NavLink>
              </li>

              {/* Add Items Dropdown */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="addItemsDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Add Items
                </a>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li>
                    <NavLink className="dropdown-item" to="/add-package">Add Package</NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/add-service">Add Service</NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/add-team">Add Employee</NavLink>
                  </li>
                </ul>
              </li>

              {/* View Items Dropdown */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="viewItemsDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  View Items
                </a>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li>
                    <NavLink className="dropdown-item" to="/view-package">View Package</NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/view-service">View Service</NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/view-team">View Employee</NavLink>
                  </li>
                </ul>
              </li>

              
            </ul>
            <div className="d-flex align-items-center">
              <span className="navbar-text text-warning fs-6 me-3">Hello, {localStorage.getItem("Admin-Name")}</span>
              <i className="fa fa-2x fa-user-circle text-white me-3"></i>
            </div>
            <Link onClick={handleLogOut} style={{ color: "pink" }}>LogOut</Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SideBarDashboard;
