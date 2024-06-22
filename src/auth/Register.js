import React, { useState } from 'react';
import { registerUser } from '../api/apiRequest';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // State to manage registration success banner

  const handleSubmit = async (e) => {
    e.preventDefault();

    const regUserData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };

    // Call the registerUser function from the API to register the user
    try {
      await registerUser(regUserData);
      setRegistrationSuccess(true); // Set registration success to true
      // Reset form fields after successful registration
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      // Hide registration success banner after 5 seconds
      setTimeout(() => {
        setRegistrationSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="container">
      <h2>Registration Form</h2>
      {/* Render the success message only when registrationSuccess is true */}
      {registrationSuccess && <div className="alert alert-success">Successful registration!</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name:</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name:</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}

export default Register;
