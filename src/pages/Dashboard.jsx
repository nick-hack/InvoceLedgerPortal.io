import React from 'react';
import Sidebar from '../pages/Sections/Sidebar';
import ChartCard from '../pages/Sections/ChartCard';
import DataTable from '../pages/Sections/DataTable';
import ChartDashboard from './Sections/ChartDashboard';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-wrapper">
      <aside className="dashboard-sidebar">
        <Sidebar />
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-container">
          <h2 className="dashboard-title">📊 Dashboard Overview</h2>

          <div className="dashboard-cards">
            <ChartCard />
          </div>

          <section className="dashboard-section">
            <h4>Analysis Chart</h4>
            <div className="dashboard-charts">
              <ChartDashboard />
            </div>
          </section>

          <section className="dashboard-section">
            <h4>🧾 Recent Records</h4>
            <div className="dashboard-charts">
              <DataTable />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;