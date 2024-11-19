import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../common/Footer';
import Header from '../common/Header';
import { toast } from 'react-toastify';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css'; // Import the CSS for styling
import { Link } from 'react-router-dom';

const Booking = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        datetime: '',
        destination: '',
        specialRequest: '',
    });

    const [data, setData] = useState([]);
    const yesterday = Datetime.moment().subtract(1, 'day');
    const valid = (current) => current.isAfter(yesterday);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:3000/package');
                setData(res.data); // Set API res to state
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleDateChange = (date) => {

        // Handle the datetime change and set it in formData
        setFormData({
            ...formData,
            datetime: date.format('YYYY-MM-DD HH:mm'), // Format the date as needed
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, destination, datetime } = formData;
        if (!name.trim() || !email.trim() || !datetime.trim() || !destination.trim()) {
            toast.error('Please fill all the required fields!');
            return false;
        }

        try {
            const res = await axios.post('http://localhost:3000/bookings', formData);
            if (res.status === 201) {
                toast.success('Booking submitted successfully!');
                setFormData({
                    name: '',
                    email: '',
                    datetime: '',
                    destination: '',
                    specialRequest: '',
                });
            } else {
                toast.error('Failed to submit booking!');
            }
        } catch (error) {
            console.error('Error submitting booking:', error);
            toast.error('An error occurred while submitting your booking!');
        }
    };

    return (
        <div>
            <Header heading="Book Your Trip" />
            {/* Process Start */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center pb-4 wow fadeInUp" data-wow-delay="0.1s">
                        <h6 className="section-title bg-white text-center text-primary px-3">Process</h6>
                        <h1 className="mb-5">3 Easy Steps</h1>
                    </div>
                    <div className="row gy-5 gx-4 justify-content-center">
                        <div className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="position-relative border border-primary pt-5 pb-4 px-4">
                                <div
                                    className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow"
                                    style={{ width: 100, height: 100 }}
                                >
                                    <i className="fa fa-globe fa-3x text-white" />
                                </div>
                                <h5 className="mt-4">Choose A Destination</h5>
                                <hr className="w-25 mx-auto bg-primary mb-1" />
                                <hr className="w-50 mx-auto bg-primary mt-0" />
                                <p className="mb-0">Explore the world with our amazing packages.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="position-relative border border-primary pt-5 pb-4 px-4">
                                <div
                                    className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow"
                                    style={{ width: 100, height: 100 }}
                                >
                                    <i className="fa fa-dollar-sign fa-3x text-white" />
                                </div>
                                <h5 className="mt-4">Pay Online</h5>
                                <hr className="w-25 mx-auto bg-primary mb-1" />
                                <hr className="w-50 mx-auto bg-primary mt-0" />
                                <p className="mb-0">Easy and secure payment methods for your convenience.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="position-relative border border-primary pt-5 pb-4 px-4">
                                <div
                                    className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow"
                                    style={{ width: 100, height: 100 }}
                                >
                                    <i className="fa fa-plane fa-3x text-white" />
                                </div>
                                <h5 className="mt-4">Fly Today</h5>
                                <hr className="w-25 mx-auto bg-primary mb-1" />
                                <hr className="w-50 mx-auto bg-primary mt-0" />
                                <p className="mb-0">Pack your bags and embark on your dream adventure.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Booking Start */}
            <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
                <div className="container">
                    <div className="booking p-5">
                        <div className="row g-5 align-items-center">
                            <div className="col-md-6 text-white">
                                <h6 className="text-white text-uppercase">Booking</h6>
                                <h1 className="text-white mb-4">Online Booking</h1>
                                <p className="mb-4">Book your next adventure with ease!</p>
                                <Link className="btn btn-outline-light py-3 px-5 mt-2" to="/packages">
                                    Read More
                                </Link>
                            </div>
                            <div className="col-md-6">
                                <h1 className="text-white mb-4">Book A Tour</h1>
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className="form-control bg-transparent"
                                                    name="name"
                                                    id="name"
                                                    placeholder="Your Name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label htmlFor="name">Your Name</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    type="email"
                                                    className="form-control bg-transparent"
                                                    name="email"
                                                    id="email"
                                                    placeholder="Your Email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label htmlFor="email">Your Email</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <Datetime
                                                    value={formData.datetime}
                                                    onChange={handleDateChange}
                                                    isValidDate={valid}
                                                    dateFormat="YYYY-MM-DD"
                                                    timeFormat="HH:mm"
                                                    inputProps={{ className: "py-3 form-control bg-transparent", placeholder: "Date & Time" }}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <select
                                                    className="form-select bg-transparent"
                                                    id="destination"
                                                    name="destination"
                                                    value={formData.destination}
                                                    onChange={handleChange}
                                                    disabled={!data.length}
                                                    required
                                                >
                                                    <option value="">Select Destination</option>
                                                    {[...new Set(data.map((res) => res.country))].map((country, index) => (
                                                        <option key={index} value={country}>
                                                            {country}
                                                        </option>
                                                    ))}
                                                </select>
                                                <label htmlFor="destination">Destination</label>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-floating">
                                                <textarea
                                                    className="form-control bg-transparent"
                                                    name="specialRequest"
                                                    id="specialRequest"
                                                    placeholder="Special Requests"
                                                    value={formData.specialRequest}
                                                    onChange={handleChange}
                                                ></textarea>
                                                <label htmlFor="specialRequest">Special Requests</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button type="submit" className="btn btn-primary py-3 px-5">
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Booking End */}
            <Footer />
        </div>
    );
};

export default Booking;
