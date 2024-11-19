import React, { useState } from 'react';
import SideBarDashboard from './Common/SideBarDashboard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPackage = () => {
  const [formData, setFormData] = useState({
    id: '',
    country: '',
    price: '',
    days: '',
    person: '',
    desc: '',
    url: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      id: new Date().getTime().toString(),
      [name]: value
    });
  };
  const redirect = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3000/package", formData)
    console.log('Form Data Submitted:', formData);
    
    setFormData({
      id: '',
      country: '',
      price: '',
      days: '',
      person: '',
      desc: '',
      url: '',
    });
    redirect('/view-package')
  };

  return (
    <div >
      <SideBarDashboard />
      <div className='bg-light flex-grow-1'>
        <h1 className='m-4 text-info text-center'>Add New Package</h1>
        <div className="container m-5 border border-2 border-primary rounded p-5 shadow">
          <form className='text-dark d-flex flex-column' onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="country" className="form-label">Country</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder='Enter the country name'
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="price" className="form-label">Price ($)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder='Enter the Price of Package'
                  id="price"
                  name="price"
                  value={formData.price}
                  min="0"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="days" className="form-label">Days</label>
                <input

                  type="number"
                  min="1"
                  className="form-control"
                  placeholder='Enter the total number of days of tour'
                  id="days"
                  name="days"
                  value={formData.days}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="person" className="form-label">Persons</label>
                <input
                  min="1"
                  type="number"
                  className="form-control"
                  placeholder='Enter the package total person'
                  id="person"
                  name="person"
                  value={formData.person}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="desc" className="form-label">Description</label>
              <textarea
                className="form-control"
                placeholder='Enter the package description'
                id="desc"
                name="desc"
                rows="3"
                value={formData.desc}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="url" className="form-label">Image URL</label>
              <input
                type="url"
                className="form-control"
                placeholder='Enter the Image URL'
                id="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                required
              />
            </div>
            <img style={{ border: 'double 10px' }} alt="Enter Image URL above to see here" className='my-3 border-primary mx-2' src={formData.url} height="300px" width="300px" />
            <div className="text-center">
              <input type='submit' value="Add Package" className="btn btn-primary btn-lg" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPackage;
