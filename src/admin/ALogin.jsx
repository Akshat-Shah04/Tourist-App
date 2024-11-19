import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ALogin = () => {
    const redirect = useNavigate()
    const [formvalue, setformvalue] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        setformvalue({
            ...formvalue,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        const { email, password } = formvalue;
        if (!email.trim() || !password.trim()) {
            toast.error("Please Enter the required details!!!");
            return;
        }

        try {
            const res = await axios.get(`http://localhost:3000/admin?email=${email}`);
            if (!res.data || res.data.length === 0) {
                toast.error("Email does not exist!");
                return;
            }

            const admin = res.data[0];
            console.log(admin)
            if (!admin.password || admin.password !== password) {
                toast.error("Incorrect Password");
                return;
            }

            localStorage.setItem("Admin-ID", admin.id);
            localStorage.setItem("Admin-Name", admin.name);

            toast.success("Login Successful");
            setformvalue({
                email: "",
                password: ""
            })
            redirect("/dashboard");

        } catch (error) {
            console.error("Login Error:", error);
            toast.error("Invalid Credentials!!");
            setformvalue({
                email: "",
                password: ""
            })
        }
    };

    const handleSignupRedirect = () => {
        redirect("/adminSignup")
    }

    useEffect(() => {
        if (localStorage.getItem('Admin-ID')) {
            redirect("/dashboard")
        }

    }, [redirect])

    return (
        <div className='bg-light p-1'>
            <div className='container my-5'>
                <form className='bg-dark px-4 py-3 border border-info border-4'>
                    <h1 className='text-info text-center mb-5 mt-4 text-decoration-underline' style={{ fontFamily: "fantasy", letterSpacing: "2px" }}>Admin Login Page</h1>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            onChange={handleChange}
                            name='email'
                            value={formvalue.email}
                            type="email"
                            className="bg-white text-dark form-control"
                            id="email"
                            aria-describedby="email"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            onChange={handleChange}
                            name='password'
                            value={formvalue.password}
                            type="password"
                            className="bg-white text-dark form-control"
                            id="password"
                        />
                    </div>

                    <Link className='text-danger' to="/forgot-password">Forgot Password?</Link>

                    <div className="row my-5 d-flex flex-row justify-content-center gap-3">
                        <button type="button" onClick={handleLogin} className="btn btn-outline-success w-25">Login</button>
                        <button type="button" className="btn btn-outline-danger w-25" onClick={handleSignupRedirect}>Signup</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ALogin
