import React, { useState } from 'react'
import SideBarDashboard from './Common/SideBarDashboard'
import axios from 'axios'

const AddService = () => {
  const [service, setservice] = useState({
    id: '',
    title: '',
    logo: '',
    desc: '',
  })
  const handleChange = (e) => {
    setservice({
      ...service,
      id: new Date().getTime().toString(),
      [e.target.name]: e.target.value
    });
  }


  const handleSubmit = async (e) => {
  e.preventDefault();

  const services = [
    {
      id: new Date().getTime().toString() + "1",
      title: "City Tours",
      logo: "fa fa-3x fa-map",
      desc: "Explore major cities with our guided tours covering top attractions.",
    },
    {
      id: new Date().getTime().toString() + "2",
      title: "Cruise Vacations",
      logo: "fa fa-3x fa-ship",
      desc: "Enjoy luxury cruise vacations to exotic destinations around the world.",
    },
    {
      id: new Date().getTime().toString() + "3",
      title: "Budget Travel",
      logo: "fa fa-3x fa-money",
      desc: "Affordable travel packages designed for budget-conscious travelers.",
    },
    {
      id: new Date().getTime().toString() + "4",
      title: "Business Travel",
      logo: "fa fa-3x fa-briefcase",
      desc: "Hassle-free business travel arrangements with premium services.",
    },
    {
      id: new Date().getTime().toString() + "5",
      title: "Eco-Tourism",
      logo: "fa fa-3x fa-leaf",
      desc: "Sustainable travel options for nature lovers and eco-conscious travelers.",
    },
    {
      id: new Date().getTime().toString() + "6",
      title: "Photography Tours",
      logo: "fa fa-3x fa-camera",
      desc: "Capture stunning landscapes and cultural moments with expert-led photography tours.",
    },
    {
      id: new Date().getTime().toString() + "7",
      title: "Wellness Retreats",
      logo: "fa fa-3x fa-spa",
      desc: "Rejuvenate with yoga, meditation, and spa retreats in peaceful locations.",
    },
    {
      id: new Date().getTime().toString() + "8",
      title: "Wildlife Safari",
      logo: "fa fa-3x fa-paw",
      desc: "Get up close with wildlife in their natural habitat on thrilling safaris.",
    },
  ];

  try {
    await Promise.all(services.map(service => axios.post("http://localhost:3000/services", service)));
    console.log('All services added successfully');
  } catch (error) {
    console.error('Error adding services:', error);
  }

  }
  return (
    <div >
      <SideBarDashboard />
      <div className='bg-light flex-grow-1'>
        <h1 className='m-4 text-info text-center'>Add New Service</h1>
        <div className="container m-5 border border-2 border-primary rounded p-5 shadow">
          <form className='text-dark d-flex flex-column' onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-12">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder='Enter the Service Name'
                  id="title"
                  name="title"
                  onChange={handleChange}
                  value={service.title}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-12">
                <label htmlFor="days" className="form-label">Logo</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder='Enter the class name for icon of service(Font Awesome Version 4 only)'
                  id="logo"
                  name="logo"
                  onChange={handleChange}
                  value={service.logo}
                  required
                />
              </div>  
            </div>
            <div className="mb-3">
              <div className="col-md-12 p-2">
                <i className={`${service.logo} text-danger mb-4`}></i>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="desc" className="form-label">Description</label>
              <textarea
                className="form-control"
                placeholder='Enter the Service description'
                id="desc"
                name="desc"
                rows="3"
                onChange={handleChange}
                value={service.desc}
                required
              />
            </div>
            <div className="text-center">
              <input type='submit' value="Add Service" className="btn btn-primary btn-lg" />
            </div>
          </form>
        </div>
      </div >
    </div >
  )
}

export default AddService
