import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import axios from 'axios';

const TravelGuide = () => {
    const [team, setTeam] = useState([]);
    const fetchData = async () => {
        const res = await axios.get("http://localhost:3000/team")
        setTeam(res.data)
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div>
            <Header heading="Meet Our Team" desc="Lorem ipsum dolor sit." />
            {/* Team Start */}
            <div className="container-xxl py-5">

                <div className="container">
                    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                        <h6 className="section-title bg-white text-center text-primary px-3">Travel Guide</h6>
                        <h1 className="mb-5">Meet Our Guide</h1>
                    </div>
                    <div className="row g-4">
                        {
                            team && team.map((res) => (
                                <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                    <div className="team-item">
                                        <div className="overflow-hidden">
                                            <img className="img-fluid" style={{ height: "auto", objectFit: "cover" }} src={res.profileURL} alt="cover-team" />
                                        </div>
                                        <div className="position-relative d-flex justify-content-center" style={{ marginTop: '-19px' }}>
                                            <a className="btn btn-square mx-1" href><i className="fab fa-facebook-f" /></a>
                                            <a className="btn btn-square mx-1" href><i className="fab fa-twitter" /></a>
                                            <a className="btn btn-square mx-1" href><i className="fab fa-instagram" /></a>
                                        </div>
                                        <div className="text-center p-4">
                                            <h5 className="mb-0">{res.firstName} {res.lastName}</h5>
                                            <small>{res.role}</small><br />
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
            <Footer />
        </div>
    )
}

export default TravelGuide
