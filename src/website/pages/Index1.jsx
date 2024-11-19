import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

const Index1 = () => {
    const redirect = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("User-Id") && !localStorage.getItem("User-Name")) {
            redirect('/login');
            toast.error("Please Login!!")
        }
    }, [redirect]);





    const [packages, setPackages] = useState([])
    const [service, setservice] = useState([])


    const FetchData = async () => {
        try {
            const res = await axios.get("http://localhost:3000/package");
            setPackages(res.data);
            const res1 = await axios.get("http://localhost:3000/services");
            setservice(res1.data);
            const res2 = await axios.get("http://localhost:3000/team");
            setTeam(res2.data);
        } catch (error) {
            console.error("Error fetching packages:", error)
        }
    }

    const [team, setTeam] = useState([])



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
        FetchData()
    }, [])


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


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleDateChange = (date) => {

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
            <Header heading="Home Page" desc="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus aut nam qui ratione aspernatur non illum illo iure est earum." />

            <div>
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

                                <Link className="btn btn-primary py-3 px-5 mt-2" href="/services">Read More</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Service Start */}
                <div className="container-xxl py-5">
                    <div className="container">
                        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                            <h6 className="section-title bg-white text-center text-primary px-3">Services</h6>
                            <h1 className="mb-5">Our Services</h1>
                        </div>
                        <div className="row g-4">
                            {
                                service && service.slice(0, 4).map((i, index) => {
                                    return (
                                        <div key={index} className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                                            <div className="service-item rounded pt-3">
                                                <div className="p-4">
                                                    <i className={`${i.logo} text-primary mb-4`} />
                                                    <h5>{i.title}</h5>
                                                    <p>{i.desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                        <div className="d-flex w-100 justify-content-center mt-5">
                            <Link className="btn btn-primary py-3 px-5 mt-2" href="/services">Read More</Link>
                        </div>
                    </div>
                </div>
                {/* Service End */}
                {/* Destination Start */}
                <div className="container-xxl py-5 destination">
                    <div className="container">
                        {/* Section Title */}
                        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                            <h6 className="section-title bg-white text-center text-primary px-3">Destination</h6>
                            <h1 className="mb-5">Popular Destination</h1>
                        </div>

                        {/* Destination Grid */}
                        <div className="row g-3">
                            {/* Left Column (Large + Two Smaller) */}
                            <div className="col-lg-7 col-md-6">
                                <div className="row g-3">
                                    {/* Large Image */}
                                    <div className="col-lg-12 col-md-12 wow zoomIn" data-wow-delay="0.1s">
                                        <a className="position-relative d-block overflow-hidden" href="#">
                                            <img className="img-fluid" src="img/destination-1.jpg" alt="Thailand" />
                                            <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">30% OFF</div>
                                            <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">Thailand</div>
                                        </a>
                                    </div>

                                    {/* Smaller Image 1 */}
                                    <div className="col-lg-6 col-md-12 wow zoomIn" data-wow-delay="0.3s">
                                        <a className="position-relative d-block overflow-hidden" href="#">
                                            <img className="img-fluid" src="img/destination-2.jpg" alt="Malaysia" />
                                            <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">25% OFF</div>
                                            <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">Malaysia</div>
                                        </a>
                                    </div>

                                    {/* Smaller Image 2 */}
                                    <div className="col-lg-6 col-md-12 wow zoomIn" data-wow-delay="0.5s">
                                        <a className="position-relative d-block overflow-hidden" href="#">
                                            <img className="img-fluid" src="img/destination-3.jpg" alt="Australia" />
                                            <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">35% OFF</div>
                                            <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">Australia</div>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column (Single Large Image) */}
                            <div className="col-lg-5 col-md-6 wow zoomIn" data-wow-delay="0.7s" style={{ minHeight: 350 }}>
                                <a className="position-relative d-block h-100 overflow-hidden" href="#">
                                    <img className="img-fluid w-100 h-100" src="img/destination-4.jpg" alt="Indonesia" style={{ objectFit: 'cover' }} />
                                    <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">20% OFF</div>
                                    <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">Indonesia</div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Destination Start */}
                {/* Package Start */}
                <div className="container-xxl py-5">
                    <div className="container">
                        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                            <h6 className="section-title bg-white text-center text-primary px-3">Packages</h6>
                            <h1 className="mb-5">Awesome Packages</h1>
                        </div>
                        <div className="row g-4 justify-content-center">
                            {packages && packages.slice(0, 3).map((pack, index) => (
                                <div key={index} className="col-lg-4 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay="0.5s">
                                    <div className="package-item">
                                        <div className="overflow-hidden">
                                            <img className="img-fluid" src={pack.url} alt="Package" style={{ height: '230px', objectFit: 'cover', width: '100%' }} />

                                        </div>
                                        <div className="d-flex border-bottom">
                                            <small className="flex-fill text-center border-end py-2">
                                                <i className="fa fa-map-marker-alt text-primary me-2" />{pack.country}
                                            </small>
                                            <small className="flex-fill text-center border-end py-2">
                                                <i className="fa fa-calendar-alt text-primary me-2" />{pack.days} Days
                                            </small>
                                            <small className="flex-fill text-center py-2">
                                                <i className="fa fa-user text-primary me-2" />{pack.person} Person
                                            </small>
                                        </div>
                                        <div className="text-center p-4">
                                            <h3 className="mb-0">${pack.price}</h3>

                                            <p>{pack.desc}</p>
                                            <div className="d-flex justify-content-center mb-2">
                                                <a href="#" className="btn btn-sm btn-primary px-3 border-end" style={{ borderRadius: '30px 0 0 30px' }}>Read More</a>
                                                <a href="#" className="btn btn-sm btn-primary px-3" style={{ borderRadius: '0 30px 30px 0' }}>Book Now</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="d-flex w-100 justify-content-center mt-5">
                            <Link className="btn btn-primary py-3 px-5 mt-2" href="/packages">View More Packages</Link>
                        </div>
                    </div>
                </div>
                {/* Package End */}
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
                                                    {/* <label htmlFor="datetime">Date & Time</label> */}
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
                {/* Booking Start */}
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
                                    <div className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow" style={{ width: 100, height: 100 }}>
                                        <i className="fa fa-globe fa-3x text-white" />
                                    </div>
                                    <h5 className="mt-4">Choose A Destination</h5>
                                    <hr className="w-25 mx-auto bg-primary mb-1" />
                                    <hr className="w-50 mx-auto bg-primary mt-0" />
                                    <p className="mb-0">Tempor erat elitr rebum clita dolor diam ipsum sit diam amet diam eos erat ipsum et lorem et sit sed stet lorem sit</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp" data-wow-delay="0.3s">
                                <div className="position-relative border border-primary pt-5 pb-4 px-4">
                                    <div className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow" style={{ width: 100, height: 100 }}>
                                        <i className="fa fa-dollar-sign fa-3x text-white" />
                                    </div>
                                    <h5 className="mt-4">Pay Online</h5>
                                    <hr className="w-25 mx-auto bg-primary mb-1" />
                                    <hr className="w-50 mx-auto bg-primary mt-0" />
                                    <p className="mb-0">Tempor erat elitr rebum clita dolor diam ipsum sit diam amet diam eos erat ipsum et lorem et sit sed stet lorem sit</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp" data-wow-delay="0.5s">
                                <div className="position-relative border border-primary pt-5 pb-4 px-4">
                                    <div className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow" style={{ width: 100, height: 100 }}>
                                        <i className="fa fa-plane fa-3x text-white" />
                                    </div>
                                    <h5 className="mt-4">Fly Today</h5>
                                    <hr className="w-25 mx-auto bg-primary mb-1" />
                                    <hr className="w-50 mx-auto bg-primary mt-0" />
                                    <p className="mb-0">Tempor erat elitr rebum clita dolor diam ipsum sit diam amet diam eos erat ipsum et lorem et sit sed stet lorem sit</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Process Start */}
                {/* Team Start */}
                <div className="container-xxl py-5">
                    <div className="container">
                        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                            <h6 className="section-title bg-white text-center text-primary px-3">Travel Guide</h6>
                            <h1 className="mb-5">Meet Our Guide</h1>
                        </div>
                        <div className="row g-4">
                            {
                                team && team.slice(0, 4).map((res) => (
                                    <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                        <div className="team-item">
                                            <div className="overflow-hidden">
                                                <img className="img-fluid" src={res.profileURL} alt />
                                            </div>
                                            <div className="position-relative d-flex justify-content-center" style={{ marginTop: '-19px' }}>
                                                <a className="btn btn-square mx-1" href><i className="fab fa-facebook-f" /></a>
                                                <a className="btn btn-square mx-1" href><i className="fab fa-twitter" /></a>
                                                <a className="btn btn-square mx-1" href><i className="fab fa-instagram" /></a>
                                            </div>
                                            <div className="text-center p-4">
                                                <h5 className="mb-0">{res.firstName} {res.lastName}</h5>
                                                <small>{res.role}</small>
                                                <br />
                                                <small>{res.department}</small>
                                            </div>
                                        </div>
                                    </div>

                                ))
                            }


                        </div>
                    </div>
                </div>

                {/* Team End */}
                {/* Testimonial Start */}
                <Helmet >
                    {/* <!-- JavaScript Libraries --> */}
                    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>
                    <script src="lib/wow/wow.min.js"></script>
                    <script src="lib/easing/easing.min.js"></script>
                    <script src="lib/waypoints/waypoints.min.js"></script>
                    <script src="lib/owlcarousel/owl.carousel.min.js"></script>
                    <script src="lib/tempusdominus/js/moment.min.js"></script>
                    <script src="lib/tempusdominus/js/moment-timezone.min.js"></script>
                    <script src="lib/tempusdominus/js/tempusdominus-bootstrap-4.min.js"></script>

                    {/* <!-- Template Javascript --> */}
                    <script src="js/main.js"></script>
                </Helmet>
                <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="container">
                        <div className="text-center">
                            <h6 className="section-title bg-white text-center text-primary px-3">Testimonial</h6>
                            <h1 className="mb-5">Our Clients Say!!!</h1>
                        </div>
                        <div className="owl-carousel testimonial-carousel position-relative">
                            <div className="testimonial-item bg-white text-center border p-4">
                                <img className="bg-white rounded-circle shadow p-1 mx-auto mb-3" src="img/testimonial-1.jpg" style={{ width: 80, height: 80 }} />
                                <h5 className="mb-0">John Doe</h5>
                                <p>New York, USA</p>
                                <p className="mb-0">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.</p>
                            </div>
                            <div className="testimonial-item bg-white text-center border p-4">
                                <img className="bg-white rounded-circle shadow p-1 mx-auto mb-3" src="img/testimonial-2.jpg" style={{ width: 80, height: 80 }} />
                                <h5 className="mb-0">John Doe</h5>
                                <p>New York, USA</p>
                                <p className="mt-2 mb-0">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.</p>
                            </div>
                            <div className="testimonial-item bg-white text-center border p-4">
                                <img className="bg-white rounded-circle shadow p-1 mx-auto mb-3" src="img/testimonial-3.jpg" style={{ width: 80, height: 80 }} />
                                <h5 className="mb-0">John Doe</h5>
                                <p>New York, USA</p>
                                <p className="mt-2 mb-0">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.</p>
                            </div>
                            <div className="testimonial-item bg-white text-center border p-4">
                                <img className="bg-white rounded-circle shadow p-1 mx-auto mb-3" src="img/testimonial-4.jpg" style={{ width: 80, height: 80 }} />
                                <h5 className="mb-0">John Doe</h5>
                                <p>New York, USA</p>
                                <p className="mt-2 mb-0">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Testimonial End */}

            </div>

            <Footer />
        </div>
    )
}

export default Index1;
