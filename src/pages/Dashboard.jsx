import React from 'react';
import Sidebar from '../pages/Sections/Sidebar';
import Topbar from '../pages/Sections/Topbar';
import ChartCard from '../pages/Sections/ChartCard';
import DataTable from '../pages/Sections/DataTable';
import ChartDashboard from './Sections/ChartDashboard';
//  import './Dashboard.css';

function Dashboard() {
  return (
   <div className="d-flex">
  <Sidebar />
  <div className="flex-grow-1 p-4">
    {/* Main content goes here */}
        {/* <Topbar /> */}
        <div className="container-fluid mt-4">
          <h2 className="mb-4">📊 Dashboard Overview</h2>

          <div className="row g-4">
          <ChartCard/>
          </div>

            <div className="dashboard-section mt-5">
            <h4>Analysis Chart</h4>
            <div className="dashboard-charts">
                <ChartDashboard />
                {/* <AnalysisChart /> */}
            </div>
            </div>


          <div className=" dashboard-section mt-5">
            <h4>🧾 Recent Records</h4>
            <div className="dashboard-charts">
            <DataTable />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;