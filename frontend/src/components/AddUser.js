import React, { useState } from 'react';
import { usersAPI } from '../services/api';

const AddUser = ({ onUserAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    rationCardNumber: '',
    familyMembers: 1
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await usersAPI.create(formData);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        rationCardNumber: '',
        familyMembers: 1
      });
      
      alert('User added successfully!');
      onUserAdded();
    } catch (error) {
      setError(error.response?.data?.message || 'Error adding user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>➕ Add New User</h2>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter full name"
                  />
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter email address"
                  />
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Ration Card Number *</label>
                  <input
                    type="text"
                    name="rationCardNumber"
                    className="form-control"
                    value={formData.rationCardNumber}
                    onChange={handleChange}
                    required
                    placeholder="Enter ration card number"
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-3">
              <label className="form-label">Address *</label>
              <textarea
                name="address"
                className="form-control"
                rows="3"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Enter full address"
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label">Family Members *</label>
              <input
                type="number"
                name="familyMembers"
                className="form-control"
                value={formData.familyMembers}
                onChange={handleChange}
                min="1"
                max="20"
                required
                placeholder="Number of family members"
              />
              <small className="form-text text-muted">
                Ration quota will be calculated automatically (Rice: 5kg, Wheat: 3kg, Sugar: 1kg per member)
              </small>
            </div>
            
            <div className="d-flex justify-content-between">
              <button 
                type="submit" 
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? 'Adding User...' : 'Add User'}
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={onUserAdded}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddUser;



