import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Docform from './adddoc'
import Recform from './addrec'
import DoctorList from './showdoc'
import Receptionist from './showrec'
import Location from './location'
import Slot from './slot'
//import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Token found in local storage:', token); // Log the token to the console
      setIsLoggedIn(true);
    }
  }, []); 

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/adminlogin', {
        username: username,
        password: password,
      });
      const { token } = response.data;
      localStorage.setItem('token', token); // Store the token in local storage
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error occurred during login:', error);
      alert('Login failed. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    setIsLoggedIn(false);
  };

  return (
    
    <div className="App">
      {isLoggedIn ? (
        <div>
          <h1>Welcome to the Admin Panel!</h1>
         
          <button>
            <Docform />
          </button>    
          <button>
            <Recform />
          </button>
          <button>
            <Slot />
          </button>
          <button>
            <DoctorList />
          </button>
          <button>
            <Receptionist />
          </button>
          <button>
            <Location />
          </button>
          
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Admin Login Page</h1>
          <div>
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
    
  );
};

export default App;
