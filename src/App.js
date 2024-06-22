import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUser from "./users/AddUser";
import EditUser from "./users/EditUser";
import ViewUser from "./users/ViewUser";
import WelcomePage from "./pages/welcome";
import LoginPage from "./auth/Login";
import Register from "./auth/Register";
import PrivateRoute from "./api/PrivateRoute"; // Import the withAuth HOC
import { UserProvider } from "./auth/UserContext";


function App() {
  return (
    <div className="App">
      <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<WelcomePage />} />
          <Route exact path="/userLogIn" element={<LoginPage />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/adduser" element={<AddUser />} />
          <Route exact path="/edituser/:id" element={<EditUser />} />
          <Route exact path="/viewuser/:id" element={<ViewUser />} />
          <Route exact path="/home"   element={<PrivateRoute component={<Home />} />}/> 
        </Routes>
        <Footer />
      </Router>
      </UserProvider>
    </div>
  );
}

export default App;
