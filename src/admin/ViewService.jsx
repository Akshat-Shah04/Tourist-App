import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SideBarDashboard from './Common/SideBarDashboard'
import { Link, useNavigate } from 'react-router-dom'

const ViewService = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const redirect = useNavigate();

  const handleEdit = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      await axios.delete(`http://localhost:3000/services/${id}`);
      FetchData();
    }
  };

  const FetchData = async () => {
    const res = await axios.get("http://localhost:3000/services");
    setData(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent form from reloading the page
    if (selectedService) {
      try {
        // Send updated data to the server
        await axios.put(`http://localhost:3000/services/${selectedService.id}`, selectedService);
        // Refresh data to reflect the updates
        FetchData();
        // Close modal after saving changes
        setShowModal(false);
      } catch (error) {
        console.error("Error updating service:", error);
      }
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <div>
      <SideBarDashboard />

      <div className="container my-5">
        <Link to="/add-service" className="float-end mb-3 btn btn-primary px-3 py-1">
          <i className="fa fa-plus-circle ms-0"></i> Add Service
        </Link>
        <table className="table table-success table-hover">
          <thead>
            <tr className="text-center">
              <th scope="col">#ID</th>
              <th scope="col">Service Name</th>
              <th scope="col">Icon Class</th>
              <th scope="col">Icon</th>
              <th scope="col">Action Buttons</th>
            </tr>
          </thead>
          <tbody>
            {data.map((res) => (
              <tr className="text-center" key={res.id}>
                <td>{res.id}</td>
                <td>{res.title}</td>
                <td>{res.logo}</td>
                <td>
                  <i className={`${res.logo} text-primary mb-4`}></i>
                </td>
                <td>
                  <div className="btn-group gap-2" role="group" aria-label="Basic example">
                    <button type="button" onClick={() => handleEdit(res)} className="btn btn-warning">Edit</button>
                    <button type="button" onClick={() => handleDelete(res.id)} className="btn btn-danger">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {
        showModal && (
          <div className="modal show d-block" tabIndex={-1}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Update Details</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <label htmlFor="serviceName" className="col-3 col-form-label">Service Name</label>
                      <div className="col-auto">
                        <input
                          type="text"
                          className="form-control"
                          id="serviceName"
                          name="title"
                          value={selectedService.title || ""}
                          onChange={(e) => setSelectedService({ ...selectedService, title: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="serviceIcon" className="col-3 col-form-label">Icon Class</label>
                      <div className="col-auto">
                        <input
                          type="text"
                          className="form-control"
                          id="serviceIcon"
                          name="logo"
                          value={selectedService.logo || ""}
                          onChange={(e) => setSelectedService({ ...selectedService, logo: e.target.value })}
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-success">Save changes</button>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default ViewService;
