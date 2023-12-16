import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    name: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { name, password } = loginDetails;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      // Use fixed values for name and password
      // const fixedName = 'admin';
      // const fixedPassword = 'admin@123';

      const response = await fetch(
        `https://reacttestprojectapi.azurewebsites.net/api/UserManagement/AuthenticateUser?UserName=${name}&Password=${password}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            UserName: name,
            Password: password,
          }),
        }
      );

      const data = await response.json();
      console.log("lineno 45", data);

      if (!response.ok) {
        setError('User name or password doesn\'t match');
        return;
      }

      const authToken = data.token; 

      localStorage.setItem('authToken', authToken);

      navigate('/receipt-list');

      console.log('Login successful');
    } catch (error) {
      setError('An error occurred during login');
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div className="container">
      <div className="login">
        <h1>Log in</h1>
        <div className="login_container">
          <div className="left">
            <div className="logo_container">
              <h1>Logo</h1>
            </div>
          </div>
          <div className="right">
            <div className="form">
              <input
                type="text"
                placeholder="Username"
                name="name"
                value={name}
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
              <p className="error">{error}</p>
              <p className="p">Forgot password</p>
              <button onClick={handleLogin} className="submit_btn">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
