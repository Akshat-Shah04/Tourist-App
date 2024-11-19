import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AdminRegister() {
    const [data, setData] = useState({
        id: "",
        email: "",
        password: "",
        name: ""
    });

    useEffect(()=>{
        if(localStorage.getItem("Admin-Id") || localStorage.getItem("Admin-Name")){
            redirect("/dashboard")
            toast.error("Please Log Out to Register!!!")

        }
    })

    const redirect = useNavigate();

    const handleChange = (e) => {
        setData({
            ...data,
            id: new Date().getTime().toString(),
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`http://localhost:3000/admin`, data);
            console.log("New Admin Data => ", res.data);

            setData({
                id: "",
                email: "",
                password: "",
                name: ""
            });
            toast.success("Admin Registered Successfully!!")
            redirect('/adminLogin');
        } catch (error) {
            toast.error("Error during registration:", error);
            console.log("Error during registration:", error);
        }
    };

    const handleLoginRedirect = () => {
        redirect('/adminLogin');
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <h2 className="text-center text-primary mb-4">Admin Registration</h2>

                <div className="row mb-3">
                    <label htmlFor="name" className="col-md-3 col-sm-12 col-form-label">Name</label>
                    <div className="col-md-9 col-sm-12">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="email" className="col-md-3 col-sm-12 col-form-label">Email</label>
                    <div className="col-md-9 col-sm-12">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="password" className="col-md-3 col-sm-12 col-form-label">Password</label>
                    <div className="col-md-9 col-sm-12">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-center gap-4 my-5">
                    <button type="submit" className="btn btn-outline-danger">Register</button>
                    <button type="button" className="btn btn-outline-success" onClick={handleLoginRedirect}>Login</button>
                </div>
            </form>
        </div>
    );
}

export default AdminRegister;
