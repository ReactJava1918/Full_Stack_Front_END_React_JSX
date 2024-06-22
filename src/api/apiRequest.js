// apiRequest.js
import axios from "axios";

const API_URL = "http://localhost:8080";

// Function to set JWT token in Axios headers and sessionStorage
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    sessionStorage.setItem("jwtToken", token);
  } else {
    delete axios.defaults.headers.common["Authorization"];
    sessionStorage.removeItem("jwtToken");
  }
};

// Function to get JWT token from sessionStorage
const getAuthToken = () => {
  return sessionStorage.getItem("jwtToken");
};

const getRegUserdata = () => {
  try {
    console.log("Before data loading from session");
    const regUserData = sessionStorage.getItem("regUserData");
    console.log("After data loading from session:", regUserData);
    return JSON.parse(regUserData);
  } catch (error) {
    console.error("Error loading user data from session:", error);
    return null;
  }
};

// Register a new user
const registerUser = async (formData) => {
    console.log("hellooooooooooooooooooooooooooooooooooooooooooooooo");
  try {
    console.log("cntrl in reg user ");
    const response = await axios.post(`${API_URL}/auth/register-user`, formData);
    console.log("cntrl in after hitting api ");

    return response.data;
  } catch (error) {
    throw new Error("Registration failed");
  }
};

// Log in a user
const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    sessionStorage.setItem("regUserData", JSON.stringify(response.data))
    const { token } = response.data;
    console.log("Token:-----------------------------"+token);
    setAuthToken(token); // Set JWT token
    return response.data;
  } catch (error) {
    throw new Error("Login failed");
  }
};

// Get user data by user ID
const getUser = async () => {
  try {
    console.log("-----------------Before Token--------------");
    const token = getAuthToken();
    console.log("-----------------After Token--------------");
    const regUserData = getRegUserdata(); // Parse the JSON string from sessionStorage
    console.log("-----------------After Data taken --------------");
    console.log("data loaded from server--------------"+regUserData);
    const response = await axios.get(`${API_URL}/auth/regusers/${regUserData.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get user data");
  }
};


// Update user data by user ID
const updateUser = async (userId, userData) => {
  try {
    const token = getAuthToken();
    const response = await axios.put(`${API_URL}/auth/regusers/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to update user");
  }
};

// Delete a user by user ID
const deleteUser = async (userId) => {
  try {
    const token = getAuthToken();
    const response = await axios.delete(`${API_URL}/auth/regusers/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete user");
  }
};

// Get all users
const getAllUsers = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_URL}/auth/regusers`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get all users");
  }
};

export { registerUser, login, getUser, updateUser, deleteUser, getAllUsers, setAuthToken,getRegUserdata,getAuthToken };
