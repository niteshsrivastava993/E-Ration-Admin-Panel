import React, { useState, useEffect } from 'react';
import { usersAPI } from '../services/api';

const UserList = ({ onEditUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await usersAPI.getAll();
      setUsers(response.data);
    } catch (error) {
      setError('Error fetching users');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, userName) => {
    if (window.confirm(`Are you sure you want to delete ${userName}?`)) {
      try {
        await usersAPI.delete(id);
        setUsers(users.filter(user => user._id !== id));
        alert('User deleted successfully!');
      } catch (error) {
        alert('Error deleting user');
        console.error('Error deleting user:', error);
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading users...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>👥 Ration Card Users</h2>
        <span className="badge bg-primary">Total: {users.length}</span>
      </div>
      
      {users.length === 0 ? (
        <div className="alert alert-info">No users found. Add some users to get started!</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Ration Card</th>
                <th>Family Members</th>
                <th>Ration Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.rationCardNumber}</td>
                  <td>{user.familyMembers}</td>
                  <td>
                    <small>
                      <div>Rice: {user.issuedRation.rice}/{user.rationQuota.rice} kg</div>
                      <div>Wheat: {user.issuedRation.wheat}/{user.rationQuota.wheat} kg</div>
                      <div>Sugar: {user.issuedRation.sugar}/{user.rationQuota.sugar} kg</div>
                    </small>
                  </td>
                  <td>
                    <button 
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => onEditUser(user)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(user._id, user.name)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;