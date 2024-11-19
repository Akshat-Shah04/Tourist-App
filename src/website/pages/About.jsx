import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import { Link } from 'react-router-dom'
const About = () => {
    return (
        <div>
            <Header heading="About Us" desc="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis, voluptatum voluptates." />
            {/* About Start */}

            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5 align-items-center">
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s" style={{ minHeight: 400 }}>
                            <div className="h-100">
                                <img className="img-fluid w-100 h-100" src="img/about.jpg" alt="About Us" style={{ objectFit: 'cover' }} />
                            </div>
                        </div>

                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
                            <h6 className="section-title bg-white text-start text-primary pe-3">About Us</h6>
                            <h1 className="mb-4">Welcome to <span className="text-primary">Tourist</span></h1>
                            <p className="mb-4">
                                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit.
                            </p>
                            <p className="mb-4">
                                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet.
                            </p>

                            <div className="row gy-2 gx-3 mb-4">
                                <div className="d-flex col-12">
                                    <div className="col-6">
                                        <p className="mb-3"><i className="fa fa-arrow-right text-primary me-2" />First Class Flights</p>
                                        <p className="mb-3"><i className="fa fa-arrow-right text-primary me-2" />5 Star Accommodations</p>
                                        <p className="mb-3"><i className="fa fa-arrow-right text-primary me-2" />150 Premium City Tours</p>
                                    </div>
                                    <div className="col-6">
                                        <p className="mb-3"><i className="fa fa-arrow-right text-primary me-2" />Handpicked Hotels</p>
                                        <p className="mb-3"><i className="fa fa-arrow-right text-primary me-2" />Latest Model Vehicles</p>
                                        <p className="mb-3"><i className="fa fa-arrow-right text-primary me-2" />24/7 Service</p>
                                    </div>
                                </div>
                            </div>

                            <Link className="btn btn-primary py-3 px-5 mt-2" to="/services">Read More</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default About
