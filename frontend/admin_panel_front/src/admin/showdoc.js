import React, { useState, useEffect } from 'react';

function DoctorList() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch data from the API endpoint when the component mounts
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:5000/showdoctors', {
          headers: {
            'Authorization': `${localStorage.getItem('token')}` // Replace with your authentication token
          }
        });
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    }

    fetchData(); // Call the fetchData function
  }, []); // Empty dependency array ensures useEffect runs once after initial render

  return (
    <div>
      <h2>List of Doctors</h2>
      <ul>
        {doctors.map(doctor => (
          <li key={doctor._id}>{doctor.name}</li> 
        ))}
      </ul>
    </div>
  );
}

export default DoctorList;
