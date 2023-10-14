import React, { useState, useEffect } from 'react';

function ReceptionistList() {
  const [receptionists, setReceptionists] = useState([]);

  useEffect(() => {
    // Fetch data from the API endpoint when the component mounts
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:5000/showreceptionists', {
          headers: {
            'Authorization': `${localStorage.getItem('token')}` // Replace with your authentication token
          }
        });
        const data = await response.json();
        setReceptionists(data);
      } catch (error) {
        console.error('Error fetching receptionists:', error);
      }
    }

    fetchData(); // Call the fetchData function
  }, []); // Empty dependency array ensures useEffect runs once after initial render

  return (
    <div>
      <h2>List of Receptionists</h2>
      <ul>
        {receptionists.map(receptionist => (
          <li key={receptionist._id}>{receptionist.email}</li> 
        ))}
      </ul>
    </div>
  );
}

export default ReceptionistList;
