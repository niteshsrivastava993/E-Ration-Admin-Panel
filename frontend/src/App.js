import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';

function App() {
  const [admin, setAdmin] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    // Check if admin is already logged in
    const savedAdmin = localStorage.getItem('admin');
    const token = localStorage.getItem('token');
    
    if (savedAdmin && token) {
      setAdmin(JSON.parse(savedAdmin));
    }
  }, []);

  const handleLogin = (adminData) => {
    setAdmin(adminData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    setAdmin(null);
    setCurrentView('dashboard');
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setCurrentView('edit-user');
  };

  const handleUserUpdated = () => {
    setEditingUser(null);
    setCurrentView('users');
  };

  const handleUserAdded = () => {
    setCurrentView('users');
  };

  // If not logged in, show login page
  if (!admin) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand">🏛️ E-Ration Admin Panel</span>
          
          <div className="navbar-nav ms-auto">
            <button 
              className={`btn btn-outline-light me-2 ${currentView === 'dashboard' ? 'active' : ''}`}
              onClick={() => setCurrentView('dashboard')}
            >
              📊 Dashboard
            </button>
            <button 
              className={`btn btn-outline-light me-2 ${currentView === 'users' ? 'active' : ''}`}
              onClick={() => setCurrentView('users')}
            >
              👥 Users
            </button>
            <button 
              className={`btn btn-outline-light me-2 ${currentView === 'add-user' ? 'active' : ''}`}
              onClick={() => setCurrentView('add-user')}
            >
              ➕ Add User
            </button>
            <div className="dropdown">
              <button 
                className="btn btn-outline-light dropdown-toggle" 
                type="button" 
                data-bs-toggle="dropdown"
              >
                👤 {admin.username}
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'users' && <UserList onEditUser={handleEditUser} />}
        {currentView === 'add-user' && <AddUser onUserAdded={handleUserAdded} />}
        {currentView === 'edit-user' && (
          <EditUser 
            user={editingUser}
            onUserUpdated={handleUserUpdated}
            onCancel={() => setCurrentView('users')}
          />
        )}
      </main>
    </div>
  );
}

export default App;