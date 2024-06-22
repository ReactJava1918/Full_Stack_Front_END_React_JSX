import React, { useState, useContext } from 'react'; // Add useContext import
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

function LoginPage() {
  // State to hold the input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { loginUser } = useContext(UserContext); // Add useContext here
  // Function to handle form submission
  const handleSubmit = async (e) => { // Mark the function as async
    e.preventDefault();
    // Here you can implement your login logic
    console.log('Email:', email);
    console.log('Password:', password);
    // Reset the form after submission
    const loginRequest ={
      "email":email,
      "password":password
    };

    try {
      await loginUser(loginRequest);
      setEmail('');
      setPassword('');
      navigate('/home');
     //window.location.href = '/home';
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="Email" className="form-label">Email:</label>
          <input
            type="text"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
