import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import { Helmet } from 'react-helmet'
import axios from 'axios'

const Services = () => {

  const [service, setservice] = useState([])
  useEffect(() => {
    FetchData()
  }, [])

  const FetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/services")
      setservice(res.data)
    }
    catch (error) {
      console.log("Error Fetching API : ", error);
    }
  }
  return (


    <div>
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
      <Header heading="Services" desc="Lorem, ipsum dolor sit amet consectetur adipisicing." />
      <div>
        {/* Service Start */}
        <div className="container-xxl py-5">
          <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
              <h6 className="section-title bg-white text-center text-primary px-3">Services</h6>
              <h1 className="mb-5">Our Services</h1>
            </div>
            <div className="row g-4">
              {
                service && service.map((i,index) => {
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
          </div>
        </div>
        {/* Service End */}
        {/* Testimonial Start */}

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

export default Services
