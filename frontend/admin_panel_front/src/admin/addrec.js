import React, { useState,useEffect } from 'react';

const ReceptionistForm = () => {
  const [receptionistData, setReceptionistData] = useState({
    email: '',
    branch: '',
    password: ''
  });
  const [branches, setBranches] = useState([]); 
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch('http://localhost:5000/branches');
        if (response.ok) {
          const data = await response.json();
          setBranches(data); // Store the fetched branches in state
        } else {
          console.error('Failed to fetch branches');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchBranches();
  }, []); 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReceptionistData({ ...receptionistData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/add-receptionist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`
        },
        body: JSON.stringify(receptionistData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Successfully added receptionist data
        // Handle success (e.g., show a success message to the user)
      } else {
        console.error('Failed to add receptionist data');
        // Handle error (e.g., show an error message to the user)
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <div className="form-container">
      <h2>Add Receptionist</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={receptionistData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
  <label>Branch:</label>
  <select
    name="branch"
    value={receptionistData.branch}
    onChange={handleInputChange}
    required
  >
    <option value="">Select Branch</option>
    {branches.map((branch) => (
      <option key={branch._id} value={branch._id}>
        {branch.branch}
      </option>
    ))}
  </select>
</div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={receptionistData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Add Receptionist</button>
      </form>
    </div>
  );
};

export default ReceptionistForm;
