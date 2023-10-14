import React, { useState } from 'react';
import axios from 'axios';


const DoctorForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    specialisation: '',
    experience: '',
    email: '',
    phonenumber: '',
    branch: '',
    password: '',
  });
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/add-doctor', formData);
      console.log('Doctor added successfully:', response.data);
      // Handle success (e.g., show a success message to the user)
    } catch (error) {
      console.error('Error adding doctor:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <div className="form-container">
      <h1>Add Doctor</h1>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
      <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        </div>
        <div className="form-group">
        <input
          type="text"
          name="specialisation"
          placeholder="Specialisation"
          value={formData.specialisation}
          onChange={handleInputChange}
          required
        />
        </div>
        <div className="form-group">
        <input
          type="text"
          name="experience"
          placeholder="Experience"
          value={formData.experience}
          onChange={handleInputChange}
          required
        />
        </div>
        <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        </div>
        <div className="form-group">
        <input
          type="tel"
          name="phonenumber"
          placeholder="Phone Number"
          value={formData.phonenumber}
          onChange={handleInputChange}
          required
        />
         </div>
         <div className="form-group"> 
        <input
          type="text"
          name="branch"
          placeholder="Branch"
          value={formData.branch}
          onChange={handleInputChange}
          required
        />
        </div>
        <div className="form-group">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
          />
          </div>
        <button type="submit" >Add Doctor</button>
      </form>
    </div>
  );
};



export default DoctorForm;
