import React, { useState } from 'react';
import SideBarDashboard from './Common/SideBarDashboard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPackage = () => {
  const [formData, setFormData] = useState({
    country: '',
    price: '',
    days: '',
    person: '',
    desc: '',
    url: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const packages = [
      {
        id: new Date().getTime().toString() + "1",
        country: "Switzerland",
        price: "2500",
        days: "7",
        person: "2",
        desc: "Explore the Swiss Alps with scenic train rides and beautiful lakes.",
        url: "https://example.com/switzerland.jpg",
      },
      {
        id: new Date().getTime().toString() + "2",
        country: "Japan",
        price: "3000",
        days: "10",
        person: "1",
        desc: "Experience the culture of Japan from Tokyo to Kyoto.",
        url: "https://example.com/japan.jpg",
      },
      {
        id: new Date().getTime().toString() + "3",
        country: "Italy",
        price: "2200",
        days: "6",
        person: "2",
        desc: "Visit Rome, Venice, and Florence on this Italian adventure.",
        url: "https://example.com/italy.jpg",
      },
      {
        id: new Date().getTime().toString() + "4",
        country: "Thailand",
        price: "1500",
        days: "5",
        person: "2",
        desc: "Relax on the beaches of Phuket and explore Bangkok’s street food.",
        url: "https://example.com/thailand.jpg",
      },
      {
        id: new Date().getTime().toString() + "5",
        country: "Canada",
        price: "2800",
        days: "8",
        person: "4",
        desc: "See the beauty of Niagara Falls and the Canadian Rockies.",
        url: "https://example.com/canada.jpg",
      },
      {
        id: new Date().getTime().toString() + "6",
        country: "France",
        price: "2700",
        days: "7",
        person: "2",
        desc: "Enjoy a romantic trip to Paris and the French countryside.",
        url: "https://example.com/france.jpg",
      },
      {
        id: new Date().getTime().toString() + "7",
        country: "Australia",
        price: "3200",
        days: "10",
        person: "3",
        desc: "Experience the Great Barrier Reef and Sydney Opera House.",
        url: "https://example.com/australia.jpg",
      },
      {
        id: new Date().getTime().toString() + "8",
        country: "Maldives",
        price: "3500",
        days: "6",
        person: "2",
        desc: "Enjoy luxury resorts and beautiful beaches in the Maldives.",
        url: "https://example.com/maldives.jpg",
      },
    ];
  
    try {
      await Promise.all(packages.map(pkg => axios.post("http://localhost:3000/package", pkg)));
      console.log('All packages added successfully');
      redirect('/view-package');
    } catch (error) {
      console.error('Error adding packages:', error);
    }
  };
  
  return (
    <div>
      <SideBarDashboard />
      <div className='bg-light flex-grow-1'>
        <h1 className='m-4 text-info text-center'>Add New Package</h1>
        <div className="container m-5 border border-2 border-primary rounded p-5 shadow">
          <form className='text-dark d-flex flex-column' onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}

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
                  min="1"
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

            {formData.url && (
              <img
                style={{ border: 'double 10px' }}
                alt="Package Preview"
                className='my-3 border-primary mx-2'
                src={formData.url}
                height="300px"
                width="300px"
                onError={(e) => (e.target.style.display = 'none')} // Hide broken images
              />
            )}

            <div className="text-center">
              <input type='submit' value="Add Package" className="btn btn-primary btn-lg" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPackage;
