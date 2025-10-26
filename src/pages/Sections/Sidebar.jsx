import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Sections/Sidebar.css';

function Sidebar() {
  // Sidebar collapse state
  const [collapsed, setCollapsed] = useState(false);

  // Dropdown toggle states
  const [masterOpen, setMasterOpen] = useState(false);
  const [transactionOpen, setTransactionOpen] = useState(false);

  // Navigation hook
  const navigate = useNavigate();

  // Fixed user info
  const username = 'XYZ';
  const role = 'SuperAdmin';

  // Logout handler
  const handleLogout = () => {
    // Add logout logic here (e.g., clear tokens, call API)
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className={`sidebar d-flex flex-column bg-dark text-white ${collapsed ? 'collapsed' : ''}`}>
      
      {/* Sidebar Header */}
      <div className="sidebar-header d-flex justify-content-between align-items-center p-3">
        <h5 className="mb-0">{collapsed ? 'A' : 'Admin Panel'}</h5>
        <button
          className="btn btn-sm btn-outline-light toggle-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? '☰' : '×'}
        </button>
      </div>

      {/* User Info Section */}
      {!collapsed && (
        <div className="user-info px-3 pb-2 border-bottom">
          <div><strong>👤</strong> {username}</div>
          <div><strong>🔖</strong> {role}</div>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="nav flex-column px-2 flex-grow-1">
        <Link to="/" className="nav-link text-white">🏠 Dashboard</Link>

        {/* Master Data Section */}
        <div
          className="nav-link text-white d-flex justify-content-between align-items-center"
          onClick={() => setMasterOpen(!masterOpen)}
          style={{ cursor: 'pointer' }}
        >
          <span>📁 Master Data</span>
          <span>{masterOpen ? '▲' : '▼'}</span>
        </div>
        {masterOpen && (
          <div className="submenu ps-3">
            <Link to="/Users" className="nav-link text-white">👤 Users</Link>
            <Link to="/companies" className="nav-link text-white">🏢 Companies</Link>
            <Link to="/projects" className="nav-link text-white">📂 Projects</Link>
          </div>
        )}

        {/* Transactions Section */}
        <div
          className="nav-link text-white d-flex justify-content-between align-items-center"
          onClick={() => setTransactionOpen(!transactionOpen)}
          style={{ cursor: 'pointer' }}
        >
          <span>💼 Transactions</span>
          <span>{transactionOpen ? '▲' : '▼'}</span>
        </div>
        {transactionOpen && (
          <div className="submenu ps-3">
            <Link to="/Invoices" className="nav-link text-white">🧾 Invoices</Link>
            <Link to="/ledgers" className="nav-link text-white">📘 Ledgers</Link>
            <Link to="/expenses" className="nav-link text-white">💸 Expenses</Link>
          </div>
        )}
      </nav>

      {/* Logout Button */}
      <div className="p-3 border-top">
        <button className="btn btn-outline-light w-100" onClick={handleLogout}>
          🔓 Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;