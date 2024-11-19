import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Profile = () => {
    const redirect = useNavigate()
    const handleCancel = () => {
        redirect("/")
    }

    const [data, setData] = useState({
        id: "",
        name: "",
        email: "",
        status: "",
        password: "",
        image: ""
    })

    const fetchdata = async (e) => {
        try {
            const res = await axios.get(`http://localhost:3000/users/${localStorage.getItem(`User-Id`)}`)
            console.log("Data Fethced : ", res.data);
            setData(res.data);
        }
        catch (error) {
            console.log("Error Caught 1234 => ", error);
        }
    }

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value

        })
        console.log("Data : ", data);
    }

    useEffect(() => {
        fetchdata()
    }, [])

    const profileUpdate = async (e) => {
        e.preventDefault();
        const { email, password, name, image } = data
        if (!email.trim() || !password.trim() || !name.trim() || !image.trim()) {
            toast.error("Please Fill All the required fields !!")
            console.log("Error ! Fill all fields");
            return
        }
        try {
            const res1 = await axios.get(`http://localhost:3000/users/}${data.id}`)
            console.log("Previous Data : ",res1 )
            const res = await axios.patch(`http://localhost:3000/users/}${data.id}`, data);
            console.log("Data Updated : ",res.data);
        } catch (error) {

        }

    }

    return (
        <div>
            <Header />
            <div className="container my-5">
                <form className='bg-light py-5 px-5' onSubmit={handleSignUp}>
                    <h1 className='text-danger text-center mb-5 mt-4 text-decoration-underline' style={{ fontFamily: "sans-serif", letterSpacing: "0" }}>Sign-Up Page</h1>

                    <div className="row mb-3">
                        <label htmlFor="name" className="col-3 me-2 text-dark col-form-label text-nowrap">Name</label>
                        <div className="col-9 col-sm-auto">
                            <input type="text" name='name' onChange={handleChange} value={data.name} className="form-control" id="name" aria-describedby="emailHelp" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="email" className="col-3 text-dark col-form-label me-2 text-nowrap ">Email address</label>
                        <div className="col-9 col-sm-auto">
                            <input type="email" name='email' onChange={handleChange} value={data.email} className="form-control" id="email" aria-describedby="emailHelp" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="password" className="col-3 text-dark col-form-label me-2 text-nowrap">Password</label>
                        <div className="col-9 col-sm-auto">
                            <input type="password" name='password' onChange={handleChange} value={data.password} className="form-control" id="password" />
                            <h6>{data.password}</h6>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="image" className="col-3 text-dark text-nowrap me-2 col-form-label">Profile Image</label>
                        <div className="col-9 col-sm-auto">
                            <input type="url" name='image' onChange={handleChange} value={data.image} className="form-control" id="image" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-8"></div>
                        <div className="col-md-4 d-flex flex-wrap gap-2">
                            <button type="button" onClick={profileUpdate} className="btn px-4 py-2 rounded-pill btn-outline-danger float-end">
                                Update Profile
                            </button>
                            <button onClick={handleCancel} className='btn px-4 py-2 rounded-pill btn-outline-primary float-end'>
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    )
}

export default Profile
