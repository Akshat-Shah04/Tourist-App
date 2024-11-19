import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SideBarDashboard from './Common/SideBarDashboard';
import axios from 'axios';

const EditPackage = () => {
    const location = useLocation();
    const packageData = location.state?.packageData;
    const [formData, setFormData] = useState({});
    const redirect = useNavigate()
    useEffect(() => {
        if (packageData) {
            setFormData({
                country: packageData.country,
                price: packageData.price,
                person: packageData.person,
                days: packageData.days,
                desc: packageData.desc,
                url: packageData.url,
            });
        }
    }, [packageData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();  
        const res = await axios.put(`http://localhost:3000/package/${packageData.id}`, formData);
        console.log("Package Edited:", res.data);
        console.log('Package updated successfully!');
        redirect('/view-package')
    };

    return (
        <div>
            <SideBarDashboard />
            <div className="container my-5">
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
                                value={formData.country || ''} // Changed from packageData to formData
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
                                value={formData.price || ''} // Changed from packageData to formData
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
                                value={formData.days || ''} // Changed from packageData to formData
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
                                value={formData.person || ''} // Changed from packageData to formData
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
                            value={formData.desc || ''} // Changed from packageData to formData
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
                            value={formData.url || ''} // Changed from packageData to formData
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <img style={{ border: 'double 10px' }} alt="Enter Image URL above to see here" className='my-3 border-primary mx-2' src={formData.url || ''} height="300px" width="300px" />
                    <div className="text-center">
                        <input type='submit' value="Update Package" className="btn btn-primary btn-lg" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPackage;
