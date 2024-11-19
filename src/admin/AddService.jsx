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
    const res = await axios.post("http://localhost:3000/services", service)
    console.log("Service added... => ", service);
    setservice({
      id: '',
      title: '',
      logo: '',
      desc: '',
    })
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
