import React, { useState, useEffect } from 'react';
import { usersAPI } from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRationIssued: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await usersAPI.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading dashboard...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>📊 Dashboard</h2>
      
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4>Total Users</h4>
                  <h2>{stats.totalUsers}</h2>
                </div>
                <div className="align-self-center">
                  <i className="fas fa-users fa-3x"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card text-white bg-success">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4>Total Ration Issued</h4>
                  <h2>{stats.totalRationIssued} kg</h2>
                </div>
                <div className="align-self-center">
                  <i className="fas fa-box fa-3x"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="card">
          <div className="card-body">
            <h5>📈 Quick Overview</h5>
            <p>Welcome to the E-Ration Admin Panel! Here you can manage ration card users, track ration distribution, and monitor the system.</p>
            <ul>
              <li>View and manage all registered users</li>
              <li>Add new ration card holders</li>
              <li>Update user information and ration details</li>
              <li>Track ration distribution statistics</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;