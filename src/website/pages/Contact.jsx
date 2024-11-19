import React, { useState } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import axios from 'axios';

const Contact = () => {
    const [msg, setMsg] = useState({
        name: '',
        email: '',
        city: '',
        issue: '',
        message: ''
    });

    const handleChange = (e) => {
        setMsg({
            ...msg,
            [e.target.name]: e.target.value
        });
        console.log(msg);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/contactMsg", msg);
            console.log("Message sent successfully:", res.data);
            // Reset form after successful submission
            setMsg({
                name: '',
                email: '',
                city: '',
                issue: '',
                message: ''
            });
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div>
            <Header heading="Contact Us" />
            <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
                <div className="container">
                    <div className="booking p-5">
                        <div className="row g-5 align-items-center">
                            <div className="col-md-6 text-white">
                                <h6 className="text-white text-uppercase">Message Us</h6>
                                <h1 className="text-white mb-4">Regarding Any Issues</h1>
                                <p className="mb-4">Book your adventure with ease!</p>
                            </div>
                            <div className="col-md-6">
                                <h1 className="text-white mb-4">Contact Us</h1>
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        {/* Name Field */}
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className="form-control bg-transparent"
                                                    name="name"
                                                    id="name"
                                                    placeholder="Your Name"
                                                    value={msg.name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label htmlFor="name">Your Name</label>
                                            </div>
                                        </div>

                                        {/* Email Field */}
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    type="email"
                                                    className="form-control bg-transparent"
                                                    name="email"
                                                    id="email"
                                                    placeholder="Your Email"
                                                    value={msg.email}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label htmlFor="email">Your Email</label>
                                            </div>
                                        </div>

                                        {/* City Field */}
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className="form-control bg-transparent"
                                                    name="city"
                                                    id="city"
                                                    placeholder="Your City of Residence"
                                                    value={msg.city}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label htmlFor="city">Your City</label>
                                            </div>
                                        </div>

                                        {/* Issue Field */}
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <select
                                                    className="form-select bg-transparent"
                                                    id="issue"
                                                    name="issue"
                                                    value={msg.issue}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">Select Issue</option>
                                                    <option value="Booking Cancellation">Booking Cancellation</option>
                                                    <option value="Change Dates">Change Dates</option>
                                                    <option value="Improper Behaviour By Travel Guides">Improper Behaviour By Travel Guides</option>
                                                    <option value="Trip Not Completed">Trip Not Completed</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                                <label htmlFor="issue">Issues</label>
                                            </div>
                                        </div>

                                        {/* Message Field */}
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <textarea
                                                    className="form-control bg-transparent"
                                                    name="message"
                                                    id="message"
                                                    placeholder="Elaborate Your Request"
                                                    value={msg.message}
                                                    onChange={handleChange}
                                                    required
                                                ></textarea>
                                                <label htmlFor="message">Message</label>
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="col-12">
                                            <button type="submit" className="btn btn-primary py-3 px-5">
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;
