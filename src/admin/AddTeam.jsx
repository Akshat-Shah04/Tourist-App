import React, { useState } from 'react';
import SideBarDashboard from './Common/SideBarDashboard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTeam = () => {
    const redirect = useNavigate();
    const [data, setdata] = useState({
        id: "",
        firstName: "",
        lastName: "",
        age: "",
        salary: "",
        department: "",
        empStatus: "",
        city: "",
        role: "",
        profileURL: "",
        email: "",
    });

    const handleChange = (e) => {
        setdata({
            ...data,
            id: new Date().getTime().toString(),
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/team", data);
            console.log("Data Added:", res.data);
        } catch (error) {
            console.error("Error adding data:", error);
        }
        setdata({
            id: "",
            firstName: "",
            lastName: "",
            age: "",
            salary: "",
            department: "",
            empStatus: "",
            city: "",
            role: "",
            profileURL: "",
            email: "",
        })
        redirect("/dashboard")
    };

    return (
        <div>
            <SideBarDashboard />
            <div className="container p-3 my-5">
                <h2 className='mb-3'>Add Employee</h2>
                <form className="mb-2" onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <div className="col-md-6 mb-sm-3 col-sm-12">
                            <label className="form-label">First Name</label>
                            <input type="text" onChange={handleChange} value={data.firstName} className="form-control" id="firstName" name="firstName" placeholder="Enter Employee's First Name" required />
                        </div>
                        <div className="col-md-6 mb-sm-3 col-sm-12">
                            <label className="form-label">Last Name</label>
                            <input type="text" onChange={handleChange} value={data.lastName} className="form-control" id="lastName" name="lastName" placeholder="Enter Employee's Last Name" required />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6 mb-sm-3 col-sm-12">
                            <label className="form-label">Email Address</label>
                            <input type="email" onChange={handleChange} value={data.email} className="form-control" id="email" name="email" placeholder="Enter Employee Email ID" required />
                        </div>
                        <div className="col-md-6 mb-sm-3 col-sm-12">
                            <label className="form-label">Age</label>
                            <input type="number" onChange={handleChange} value={data.age} min="14" max="90" className="form-control" id="age" name="age" placeholder="Enter Employee Age" required />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-4 mb-sm-3 col-sm-12">
                            <label className="form-label">Department</label>
                            <select className="form-select" name="department" onChange={handleChange} value={data.department} required>
                                <option value="">--- Select Department ---</option>
                                <option value="IT">IT</option>
                                <option value="Development">Development</option>
                                <option value="Sales">Sales</option>
                                <option value="Finance">Finance</option>
                                <option value="Operations">Operations</option>
                                <option value="Human Resources">Human Resources</option>
                            </select>
                        </div>
                        <div className="col-md-4 mb-sm-3 col-sm-12">
                            <label className="form-label">Employment Status</label>
                            <select className="form-select" name="empStatus" onChange={handleChange} value={data.empStatus} required>
                                <option value="">--- Select Employment Status ---</option>
                                <option value="Full-Time">Full-Time</option>
                                <option value="Part-Time">Part-Time</option>
                                <option value="Contract">Contract</option>
                            </select>
                        </div>

                        <div className="col-md-4 mb-sm-3 col-sm-12">
                            <label className="form-label">Designation</label>
                            <select className="form-select" name="role" onChange={handleChange} value={data.role} required>
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
                    <div className="row mb-3">
                        <div className="col-md-6 mb-sm-3 col-sm-12">
                            <label className="form-label">City</label>
                            <input type="text" onChange={handleChange} value={data.city} className="form-control" id="city" name="city" placeholder="Enter Employee City" required />
                        </div>
                        <div className="col-md-6 mb-sm-3 col-sm-12">
                            <label className="form-label">Salary</label>
                            <input type="number" min="0" onChange={handleChange} value={data.salary} className="form-control" id="salary" name="salary" placeholder="Enter Salary" required />
                        </div>
                    </div>
                    <div className="row mb-3 mb-sm-3">
                        <div className="col-md-12 mb-sm-3 col-sm-12">
                            <label htmlFor="profileURL" className="form-label">Profile Image URL</label>
                            <input type="url" onChange={handleChange} value={data.profileURL} className="form-control" id="profileURL" name="profileURL" required />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-2 mb-sm-3 col-sm-12">
                            <img width="300px" height="300px" className="border border-3 border-primary" src={data.profileURL} alt="Employee Profile" />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddTeam;
