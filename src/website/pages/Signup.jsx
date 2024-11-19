import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const redirect = useNavigate();
    const [user, setUser] = useState({
        id: "",
        email: "",
        password: "",
        name: "",
        image: "",
        status: ""
    });
    const handlelogin = () => {
        redirect("/login")
    }
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        const newUser = {
            ...user,
            id: new Date().getTime().toString(),
            status: "unblock"
        };

        try {
            const res = await axios.post(`http://localhost:3000/users/`, newUser);
            console.log("New User Added => ", res.data);
            setUser({
                id: "",
                email: "",
                password: "",
                name: "",
                image: "",
                status: ""
            });

            redirect('/login');
        } catch (error) {
            console.error("Error during sign up:", error);
        }
    };

    return (
        <div>
            <div className="container">
                <form className='bg-light py-5 px-5' onSubmit={handleSignUp}>
                    <h1 className='text-danger text-center mb-5 mt-4 text-decoration-underline' style={{ fontFamily: "sans-serif", letterSpacing: "0" }}>Sign-Up Page</h1>

                    <div className="row mb-3">
                    <label htmlFor="name" className="col-md-3 col-sm-12 text-dark col-form-label">Name</label>
                    <div className="col-md-9 col-sm-12">
                            <input type="text" name='name' onChange={handleChange} className="form-control col-md-6" id="name" aria-describedby="emailHelp" />
                        </div>
                    </div>
                    <div className="row mb-3">
                    <label htmlFor="email" className="col-md-3 col-sm-12 text-dark col-form-label">Email</label>
                    <div className="col-md-9 col-sm-12">
                            <input type="email" name='email' onChange={handleChange} className="form-control" id="email" aria-describedby="emailHelp" />
                        </div>
                    </div>
                    <div className="row mb-3">
                    <label htmlFor="password" className="col-md-3 text-dark col-sm-12 col-form-label">Password</label>
                    <div className="col-md-9 col-sm-12">
                            <input type="password" name='password' onChange={handleChange} className="form-control" id="password" />
                        </div>
                    </div>
                    <div className="row mb-3">
                    <label htmlFor="image" className="col-md-3 text-dark col-sm-12 col-form-label">Profile Photo URL</label>
                    <div className="col-md-9 col-sm-12">
                            <input type="url" name='image' onChange={handleChange} className="form-control" id="image" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-8"></div>
                        <div className="col-md-4 d-flex flex-wrap gap-2">
                            <button type="submit" className="btn px-4 py-2 rounded-pill btn-outline-danger float-end">
                                Register
                            </button>
                            <button onClick={handlelogin} className='btn px-4 py-2 rounded-pill btn-outline-primary float-end'>Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
