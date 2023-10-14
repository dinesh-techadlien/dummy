import React, { useState } from 'react';
import axios from 'axios';

const LocationForm = () => {
  const [formData, setFormData] = useState({
    branch: '',
    address: '',
    contactNumber: '',
    url: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the admin token from wherever you store it (e.g., localStorage, cookies, context, etc.)
    

    try {
      const response = await axios.post('http://localhost:5000/locations', formData, {
        headers: {
            'Authorization': `${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
      });
      console.log(response.data.message); // Assuming the API sends back a success message
      // You can perform additional actions after successful location creation here
    } catch (error) {
      console.error('Error creating location:', error);
      // Handle error states here
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  

  return (
    <div>
      <h2>Create a New Location</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="branch" value={formData.branch} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Contact Number:</label>
          <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} required />
        </div>
        <div>
          <label>URL:</label>
          <input type="text" name="url" value={formData.url} onChange={handleInputChange} required />
        </div>
        <button type="submit">Create Location</button>
      </form>
    </div>
  );
};

export default LocationForm;
