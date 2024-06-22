import React, {useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../auth/UserContext";

export default function Navbar() {
  const { user, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logic for logging out goes here
    logoutUser();
    navigate('/home');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid d-flex justify-content-between">
          <Link className="navbar-brand" to="/">
            Full Stack Application
          </Link>
          <div>
            {user ? (
              <>
                <Link className="btn btn-outline-light me-2" to="/adduser">
                  Add User
                </Link>
                <button
                  className="btn btn-outline-light me-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  className="btn btn-outline-light me-2"
                  to="/userLogIn"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-outline-light"
                  to="/register"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
