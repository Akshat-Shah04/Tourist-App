import React, { useEffect, useState } from 'react';
import SideBarDashboard from './Common/SideBarDashboard';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmModal from './Common/ConfirmModal';


const ViewPackage = () => {
  const [view, setview] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false); // State for confirmation modal
  const [selectpack, setselectpack] = useState(null);
  const [deleteId, setDeleteId] = useState(null); // State to track the package to delete

  useEffect(() => {
    FetchData();
  }, []);

  const redirect = useNavigate();

  const FetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/package");
      setview(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleView = (data) => {
    setselectpack(data);
    setIsModalOpen(true);
  };

  const handleEdit = (data) => {
    redirect('/edit-package', { state: { packageData: data } });
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setIsConfirmOpen(true); // Open confirmation modal
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/package/${deleteId}`);
      console.log("Package deleted successfully!");
      FetchData(); // Refresh the data
    } catch (error) {
      console.error("Error deleting package:", error);
    }
    setIsConfirmOpen(false); // Close the confirmation modal
    setDeleteId(null); // Reset deleteId
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setselectpack(null);
  };

  const closeConfirmModal = () => {
    setIsConfirmOpen(false);
    setDeleteId(null); // Reset deleteId when closed
  };

  return (
    <div>
      <SideBarDashboard />
      <div className="container my-5">
        <Link to="/add-package" className='float-end mb-3 btn btn-primary px-3 py-1'>
          Add Package
        </Link>
        <table className="table table-primary table-hover">

          <thead>
            <tr className='text-center'>
              <th scope="col">ID</th>
              <th scope="col">Destination</th>
              <th scope="col">Price (in $)</th>
              <th scope="col">Total Members</th>
              <th scope="col">Total Days</th>
              <th scope="col">Action Button</th>
            </tr>
          </thead>
          <tbody>
            {view && view.map((data) => (
              <tr className='text-center' key={data.id}>
                <td>{data.id}</td>
                <td>{data.country}</td>
                <td>{data.price}</td>
                <td>{data.person}</td>
                <td>{data.days}</td>
                <td>
                  <div className="btn-group gap-2" role="group">
                    <button type="button" className="btn btn-info" onClick={() => handleView(data)}>View</button>
                    <button type="button" className="btn btn-warning" onClick={() => handleEdit(data)}>Edit</button>
                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(data.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isModalOpen && selectpack && (
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Package Details</h5>
                  <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                </div>
                <div className="text-center modal-body">
                  {selectpack.url && (
                    <img height="300px" alt={selectpack.url} width="300px" style={{ objectFit: "contain" }} src={selectpack.url} />
                  )}
                  <div className="mt-3 text-start">
                    <p><strong>ID:</strong> {selectpack.id}</p>
                    <p><strong>Destination:</strong> {selectpack.country}</p>
                    <p><strong>Price:</strong> {selectpack.price}</p>
                    <p><strong>Total Person:</strong> {selectpack.person}</p>
                    <p><strong>Total Days:</strong> {selectpack.days}</p>
                    <p><strong>Description:</strong> {selectpack.desc}</p>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
        <ConfirmModal
          isOpen={isConfirmOpen}
          onClose={closeConfirmModal}
          onConfirm={confirmDelete}
          message="Are you sure you want to delete this package?"
        />
      </div>
    </div>
  );
}

export default ViewPackage;
