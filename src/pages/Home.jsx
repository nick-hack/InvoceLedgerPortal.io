import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Home.css';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    setLoading(true);
    setTimeout(() => {
      navigate(path);
    }, 1000);
  };

  return (
    <div className="finance-home">
      <div className="welcome-card text-center">
        <h1 className="title">Welcome to LedgerPro</h1>
        <p className="subtitle">Smart Billing, Invoicing & Ledger Management</p>

        <div className="stats-section">
          <div className="stat-bar">
            <label>Invoices Processed</label>
            <div className="bar"><div className="fill" style={{ width: '85%' }}></div></div>
          </div>
          <div className="stat-bar">
            <label>Ledger Accuracy</label>
            <div className="bar"><div className="fill" style={{ width: '95%' }}></div></div>
          </div>
          <div className="stat-bar">
            <label>Client Satisfaction</label>
            <div className="bar"><div className="fill" style={{ width: '90%' }}></div></div>
          </div>
        </div>

        {loading ? (
          <div className="spinner-border text-light mt-4" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div className="mt-4">
            <button onClick={() => handleNavigate('/login')} className="btn btn-outline-light me-3 animated-btn">
              Login
            </button>
            <button onClick={() => handleNavigate('/register')} className="btn btn-light animated-btn">
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
}