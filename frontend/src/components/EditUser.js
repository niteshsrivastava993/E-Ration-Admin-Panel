import React, { useState, useEffect } from 'react';
import { usersAPI } from '../services/api';

const EditUser = ({ user, onUserUpdated, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    familyMembers: 1,
    issuedRation: {
      rice: 0,
      wheat: 0,
      sugar: 0
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        familyMembers: user.familyMembers,
        issuedRation: user.issuedRation
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('issuedRation.')) {
      const rationField = name.split('.')[1];
      setFormData({
        ...formData,
        issuedRation: {
          ...formData.issuedRation,
          [rationField]: parseInt(value) || 0
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await usersAPI.update(user._id, formData);
      alert('User updated successfully!');
      onUserUpdated();
    } catch (error) {
      setError(error.response?.data?.message || 'Error updating user');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="container mt-4">
      <h2>✏️ Edit User: {user.name}</h2>
      
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
                  />
                </div>
              </div>
              
              <div className="col-md-6">
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
              />
            </div>
            
            <div className="row">
              <div className="col-md-12">
                <h5>📦 Ration Distribution</h5>
                <p className="text-muted">
                  Quota: Rice {user.rationQuota.rice}kg, Wheat {user.rationQuota.wheat}kg, Sugar {user.rationQuota.sugar}kg
                </p>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Rice Issued (kg)</label>
                  <input
                    type="number"
                    name="issuedRation.rice"
                    className="form-control"
                    value={formData.issuedRation.rice}
                    onChange={handleChange}
                    min="0"
                    max={user.rationQuota.rice}
                  />
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Wheat Issued (kg)</label>
                  <input
                    type="number"
                    name="issuedRation.wheat"
                    className="form-control"
                    value={formData.issuedRation.wheat}
                    onChange={handleChange}
                    min="0"
                    max={user.rationQuota.wheat}
                  />
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Sugar Issued (kg)</label>
                  <input
                    type="number"
                    name="issuedRation.sugar"
                    className="form-control"
                    value={formData.issuedRation.sugar}
                    onChange={handleChange}
                    min="0"
                    max={user.rationQuota.sugar}
                  />
                </div>
              </div>
            </div>
            
            <div className="d-flex justify-content-between">
              <button 
                type="submit" 
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update User'}
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={onCancel}
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

export default EditUser;