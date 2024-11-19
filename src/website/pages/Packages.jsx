import React, { useState, useEffect } from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import axios from 'axios'

function Packages() {
	const [packages, setPackages] = useState([])

	useEffect(() => {
		FetchData()
	}, [])

	const FetchData = async () => {
		try {
			const res = await axios.get("http://localhost:3000/package")
			setPackages(res.data)
		} catch (error) {
			console.error("Error fetching packages:", error)
		}
	}

	return (
		<div>
			<Header heading="Packages" desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, officia!" />
			<div>
				{/* Package Start */}
				<div className="container-xxl py-5">
					<div className="container">
						<div className="text-center wow fadeInUp" data-wow-delay="0.1s">
							<h6 className="section-title bg-white text-center text-primary px-3">Packages</h6>
							<h1 className="mb-5">Awesome Packages</h1>
						</div>
						<div className="row g-4 justify-content-center">
							{packages && packages.map((pack, index) => (
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
											{/* <div className="mb-3">
												{[...Array(5)].map((_, i) => (
													<small key={i} className="fa fa-star text-primary" />
												))}
											</div> */}
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
					</div>
				</div>
				{/* Package End */}
			</div>
			<Footer />
		</div>
	)
}

export default Packages
