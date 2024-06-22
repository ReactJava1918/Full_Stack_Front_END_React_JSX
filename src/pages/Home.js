import React, { useState, useEffect } from 'react';
import { getUser, deleteUser, getAllUsers, updateUser } from '../api/apiRequest'; // Assuming you have these functions defined in your API

function Home() {
  const [userData, setUserData] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editUserFormData, setEditUserFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUser();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleGetAllUsers = async () => {
    try {
      const users = await getAllUsers();
      setAllUsers(users);
    } catch (error) {
      console.error('Error fetching all users:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      // Filter out the deleted user from the allUsers array
      const users = await getAllUsers();
      setAllUsers(users);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditUser = async (userId) => {
    try {
      const user = allUsers.find(user => user.id === userId);
      if (user) {
        setEditUserId(userId);
        setEditUserFormData({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: ''
        });
      } else {
        // If user data is not available in allUsers, fetch it
        const userData = await getUser(userId);
        setEditUserId(userId);
        setEditUserFormData({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: ''
        });
      }
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  const handleEditUserFormChange = (e) => {
    const { name, value } = e.target;
    setEditUserFormData({
      ...editUserFormData,
      [name]: value
    });
  };

  const handleEditUserSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(editUserId, editUserFormData);
      // Update the user data in allUsers state.
      const updatedUsers = allUsers.map(user =>
        user.id === editUserId ? { ...user, ...editUserFormData } : user
      );
      setAllUsers(updatedUsers);
      // Close modal
      setEditUserId(null);
      setEditUserFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      });
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  const handleShowDeleteModal = (userId) => {
    setDeleteUserId(userId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="container mt-5">
      <header>
        <h1 className="text-center">Welcome {userData ? userData.email : ''}</h1>
      </header>
      <main>
        <section>
          <h2 className="text-center mb-4">User Management</h2>
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary mb-3" onClick={handleGetAllUsers}>Get All Users</button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>S.no</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>
                    <button className="btn btn-info me-2" onClick={() => handleEditUser(user.id)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleShowDeleteModal(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
      {/* Edit User Modal */}
      {editUserId && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit User</h5>
                <button type="button" className="close" onClick={() => setEditUserId(null)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleEditUserSubmit}>
                  <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-control" name="firstName" value={editUserFormData.firstName} onChange={handleEditUserFormChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-control" name="lastName" value={editUserFormData.lastName} onChange={handleEditUserFormChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={editUserFormData.email} onChange={handleEditUserFormChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={editUserFormData.password} onChange={handleEditUserFormChange} />
                  </div>
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Delete User Modal */}
      {showDeleteModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete User</h5>
                <button type="button" className="close" onClick={handleCloseDeleteModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this user?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseDeleteModal}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={() => {
                  handleDeleteUser(deleteUserId);
                  handleCloseDeleteModal();
                }}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
