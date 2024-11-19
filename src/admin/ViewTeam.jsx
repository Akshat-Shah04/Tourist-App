import React, { useEffect, useState } from 'react'
import SideBarDashboard from './Common/SideBarDashboard'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const ViewTeam = () => {
    const [data, setData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [selectedService, setSelectedService] = useState(null)

    const fetchData = async () => {
        const res = await axios.get("http://localhost:3000/team")
        setData(res.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleEdit = (service) => {
        setSelectedService(service)
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setSelectedService(null)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setSelectedService((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmitEditForm = async (e) => {
        e.preventDefault()
        if (selectedService) {
            await axios.put(`http://localhost:3000/team/${selectedService.id}`, selectedService)
            toast.success("Data Updated Successfully!")
            fetchData()
            handleCloseModal()
        }
    }

    return (
        <div>
            <SideBarDashboard />
            <div className="container my-5">
                <Link to="/add-team" className="float-end mb-3 btn btn-primary px-3 py-1">
                    <i className="fa fa-plus-circle ms-0 me-1"></i> Add Team
                </Link>
                <table className="table table-hover table-warning">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Department</th>
                            <th scope="col">Designation</th>
                            <th scope="col">Salary</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((res) => (
                            <tr key={res.id}>
                                <td>{res.id}</td>
                                <td>{res.firstName} {res.lastName}</td>
                                <td>{res.email}</td>
                                <td>{res.department}</td>
                                <td>{res.role}</td>
                                <td>{res.salary}</td>
                                <td>
                                    <div className="btn-group" role="group" aria-label="Action buttons">
                                        <button type="button" onClick={() => handleEdit(res)} className="btn btn-info">Edit</button>
                                        <button type="button" className="btn btn-danger">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {showModal && selectedService && (
                    <div className="modal show d-block" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="modalLabel">Update Employee Details</h5>
                                    <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form className="mb-2" onSubmit={handleSubmitEditForm}>
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label className="form-label">First Name</label>
                                                <input type="text" onChange={handleInputChange} value={selectedService.firstName} className="form-control" id="firstName" name="firstName" placeholder="Enter Employee's First Name" required />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Last Name</label>
                                                <input type="text" onChange={handleInputChange} value={selectedService.lastName} className="form-control" id="lastName" name="lastName" placeholder="Enter Employee's Last Name" required />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label className="form-label">Email Address</label>
                                                <input type="email" onChange={handleInputChange} value={selectedService.email} className="form-control" id="email" name="email" placeholder="Enter Employee Email ID" required />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Age</label>
                                                <input type="number" onChange={handleInputChange} value={selectedService.age} min="14" max="90" className="form-control" id="age" name="age" placeholder="Enter Employee Age" required />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label className="form-label">Department</label>
                                                <select className="form-select" name="department" onChange={handleInputChange} value={selectedService.department} required>
                                                    <option value="">--- Select Department ---</option>
                                                    <option value="IT">IT</option>
                                                    <option value="Development">Development</option>
                                                    <option value="Sales">Sales</option>
                                                    <option value="Finance">Finance</option>
                                                    <option value="Operations">Operations</option>
                                                    <option value="Human Resources">Human Resources</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Employment Status</label>
                                                <select className="form-select" name="empStatus" onChange={handleInputChange} value={selectedService.empStatus} required>
                                                    <option value="">--- Select Employment Status ---</option>
                                                    <option value="Full-Time">Full-Time</option>
                                                    <option value="Part-Time">Part-Time</option>
                                                    <option value="Contract">Contract</option>
                                                </select>
                                            </div>
                                            <div className="row mb-3">

                                                <div className="col-md-12">
                                                    <label className="form-label">Designation</label>
                                                    <select className="form-select" name="role" onChange={handleInputChange} value={selectedService.role} required>
                                                        <option value="">--- Select Employment Designation ---</option>
                                                        <option value="Intern">Intern</option>
                                                        <option value="Junior Developer">Junior Developer</option>
                                                        <option value="Senior Developer">Senior Developer</option>
                                                        <option value="Team Lead">Team Lead</option>
                                                        <option value="Project Manager">Project Manager</option>
                                                        <option value="Product Manager">Product Manager</option>
                                                        <option value="HR Manager">HR Manager</option>
                                                        <option value="Sales Executive">Sales Executive</option>
                                                        <option value="Marketing Manager">Marketing Manager</option>
                                                        <option value="Operations Manager">Operations Manager</option>
                                                        <option value="Director">Director</option>
                                                        <option value="CEO">CEO</option>
                                                    </select>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label className="form-label">City</label>
                                                <input type="text" onChange={handleInputChange} value={selectedService.city} className="form-control" id="city" name="city" placeholder="Enter Employee City" required />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Salary</label>
                                                <input type="number" min="0" onChange={handleInputChange} value={selectedService.salary} className="form-control" id="salary" name="salary" placeholder="Enter Salary" required />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-md-12">
                                                <label htmlFor="profileURL" className="form-label">Profile Image URL</label>
                                                <input type="url" onChange={handleInputChange} value={selectedService.profileURL} className="form-control" id="profileURL" name="profileURL" required />
                                            </div>
                                        </div>

                                        <button type="submit" className="btn btn-info">Update</button>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ViewTeam
