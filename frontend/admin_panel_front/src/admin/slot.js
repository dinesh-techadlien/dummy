import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UploadSchedule = () => {
  const [file, setFile] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/showdoctors', {
          headers: {
            'Authorization': `${localStorage.getItem('token')}` // Replace with your authentication token
          },
        });
        console.log('API Response:', response.data);
        if (response.data && response.data.length > 0) {
          setDoctors(response.data);
          setUserEmail(response.data[0].email); // Assuming you want to set the email of the first doctor
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!file || !selectedDoctor) {
        alert('Please select a file and doctor.');
        return;
      }
  
      console.log('Uploading file...');
      
      const formData = new FormData();
      formData.append('schedule', file);
  
      const response = await axios.post(`http://localhost:5000/${selectedDoctor}/schedule/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Upload response:', response.data);
      
      alert('Schedule data uploaded and saved successfully.');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    }
  };

  return (
    <div>
      <h2>Upload Schedule</h2>
      {doctors.length > 0 && (
        <div>
          <label>Select Doctor:</label>
          <select onChange={(e) => setSelectedDoctor(e.target.value)}>
            <option value="">Select a doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor.email}>
                {doctor.name} - {doctor.email}
              </option>
            ))}
          </select>
        </div>
      )}

      <br />

      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadSchedule;
