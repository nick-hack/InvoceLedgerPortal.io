import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Pie, Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
import './ProjectDetails.css';

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const projectData = {
  1: {
    name: 'AI Assistant',
    description: 'Build a smart chatbot',
    company: 'TechNova',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Logo_TechNova.svg/512px-Logo_TechNova.svg.png',
    startDate: '2025-01-10',
    endDate: '2025-04-30',
    printsCompleted: 120,
    bugsResolved: 45,
    tasksResolved: 78,
    assignedTo: [
      { name: 'Alice Johnson', role: 'Frontend Developer', status: 'Active' },
      { name: 'Bob Smith', role: 'Backend Developer', status: 'Inactive' },
      { name: 'Charlie Lee', role: 'Project Manager', status: 'Active' },
    ],
    charts: {
      pie: {
        labels: ['Completed', 'In Progress', 'Pending'],
        data: [40, 35, 25],
      },
      bar: {
        labels: ['Week 1', 'Week 2', 'Week 3'],
        data: [10, 20, 30],
      },
      wave: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        data: [5, 15, 10, 20],
      },
    },
  },
};

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectData[id];

  const [reportStart, setReportStart] = useState('');
  const [reportEnd, setReportEnd] = useState('');

  const handleDownloadPDF = () => {
    alert(`Generating PDF report from ${reportStart} to ${reportEnd}...`);
    // PDF generation logic would go here
  };

  if (!project) return <p>Project not found.</p>;

  return (
    <div className="details-container">
      <button onClick={() => navigate(-1)} className="back-button">← Back</button>

      <div className="header-section">
        <img src={project.logo} alt={`${project.company} logo`} className="company-logo" />
        <div>
          <center><h2 className="details-title">{project.name}</h2></center>
          <p><strong>Company:</strong> {project.company}</p>
         <div className="description-box">
            <h3>📝 Description</h3> <p>{project.description}</p></div>
        
       <div className="project-dates">
      <div className="date-field">
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="text"
          id="startDate"
          value={project.startDate}
          disabled
        />
      </div>
      <div className="date-field">
        <label htmlFor="endDate">End Date:</label>
        <input
          type="text"
          id="endDate"
          value={project.endDate}
          disabled
        />
      </div>
    </div>

    <button
        className="tracker-button"
        onClick={() => navigate(`/project/${id}/tracker`)}
        >
        📊 Project Tracker
        </button>

        </div>
      </div>

      <div className="report-section">
        <h3>📄 Generate Development Report</h3>
        <div className="report-controls">
          <input
            type="date"
            value={reportStart}
            onChange={(e) => setReportStart(e.target.value)}
            placeholder="Start Date"
          />
          <input
            type="date"
            value={reportEnd}
            onChange={(e) => setReportEnd(e.target.value)}
            placeholder="End Date"
          />
          <button className="download-button" onClick={handleDownloadPDF}>
            ⬇️ Download PDF
          </button>
        </div>
      </div>

      <div className="metrics-section">
        <div className="metric-box">🖨️ Prints Completed: <strong>{project.printsCompleted}</strong></div>
        <div className="metric-box">🐞 Bugs Resolved: <strong>{project.bugsResolved}</strong></div>
        <div className="metric-box">✅ Tasks Resolved: <strong>{project.tasksResolved}</strong></div>
      </div>

      <div className="assigned-section">
        <h3>👥 Assigned Users</h3>
        <table className="assigned-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {project.assignedTo.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>
                  <span className={`status-badge ${user.status === 'Active' ? 'active' : 'inactive'}`}>
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="charts-section">
        <div className="chart-box">
          <h4>Progress Overview</h4>
          <Pie
            data={{
              labels: project.charts.pie.labels,
              datasets: [{
                data: project.charts.pie.data,
                backgroundColor: ['#4caf50', '#2196f3', '#ff9800'],
              }],
            }}
          />
        </div>

        <div className="chart-box">
          <h4>Weekly Tasks</h4>
          <Bar
            data={{
              labels: project.charts.bar.labels,
              datasets: [{
                label: 'Tasks',
                data: project.charts.bar.data,
                backgroundColor: '#2196f3',
              }],
            }}
          />
        </div>

        <div className="chart-box">
          <h4>Monthly Activity</h4>
          <Line
            data={{
              labels: project.charts.wave.labels,
              datasets: [{
                label: 'Activity',
                data: project.charts.wave.data,
                borderColor: '#ff9800',
                fill: false,
              }],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;