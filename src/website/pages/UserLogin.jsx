import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserLogin = () => {
    const redirect = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (localStorage.getItem("User-Id")) {
            redirect("/");
        }
    }, [redirect]);

    const getChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
        console.log("Data(getchange) => ", data);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = data;

        if (!email.trim() || !password.trim()) {
            toast.error("Please enter all the details!");
            return;
        }

        try {
            // Fetch user details using entered email
            const res = await axios.get(`http://localhost:3000/users?email=${email}`);
            if (res.data.length === 0) {
                toast.error("Email does not exist!");
                return;
            }

            const user = res.data[0];
            if (user.password !== password) {
                toast.error("Invalid password!");
                return;
            }

            // Check the account status from the API response
            if (user.status === "block") {
                toast.error("Your account is currently blocked!");
                toast.info("Please contact the company to unblock your account.");
                return;
            }

            // Set localStorage and redirect on successful login
            localStorage.setItem("User-Id", user.id);
            localStorage.setItem("User-Name", user.name);
            localStorage.setItem("User-Email", user.email);
            localStorage.setItem("Account-Status", user.status);
            toast.success("User Login Successful!");
            redirect("/");
        } catch (error) {
            toast.error("Error logging in");
            console.log("Error Caught {catch} => ", error);
        }
    };

    const handleSignupRedirect = () => {
        redirect("/sign-up");
    };

    return (
        <div className='bg-light p-1'>
            <div className='container my-5'>
                <form className='bg-dark px-4 py-3 border border-info border-4' onSubmit={handleLogin}>
                    <h1 className='text-info text-center mb-5 mt-4 text-decoration-underline' style={{ fontFamily: "fantasy", letterSpacing: "2px" }}>Login Page</h1>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            onChange={getChange}
                            name='email'
                            value={data.email}
                            type="email"
                            className="bg-white text-dark form-control"
                            id="email"
                            aria-describedby="email"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            onChange={getChange}
                            name='password'
                            value={data.password}
                            type="password"
                            className="bg-white text-dark form-control"
                            id="password"
                        />
                    </div>

                    <Link className='text-danger' to="/forgot-password">Forgot Password?</Link>

                    <div className="row my-5 d-flex flex-row justify-content-center gap-3">
                        <button type="submit" className="btn btn-primary w-25">Login</button>
                        <button type="button" className="btn btn-secondary w-25" onClick={handleSignupRedirect}>Signup</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserLogin;
