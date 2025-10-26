import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Project.css';
import Sidebar from '../Sections/Sidebar';

const projects = [
  { id: 1, name: 'AI Assistant', description: 'Build a smart chatbot', company: 'TechNova' },
  { id: 2, name: 'Weather App', description: 'Show current weather data', company: 'SkySoft' },
  { id: 3, name: 'Task Manager', description: 'Track daily tasks', company: 'TechNova' },
  { id: 4, name: 'Finance Tracker', description: 'Monitor expenses', company: 'FinEdge' },
];

const Project = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleViewDetails = (id) => {
    navigate(`/project/${id}`);
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4">
        <div className="project-container">
          <h2 className="project-title">📁 Company Projects</h2>

          <input
            type="text"
            placeholder="Search by Company or Project Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <table className="project-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Project Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => (
                <tr key={project.id}>
                  <td>{project.company}</td>
                  <td>{project.name}</td>
                  <td>{project.description}</td>
                  <td>
                    <button
                      className="view-button"
                      onClick={() => handleViewDetails(project.id)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
              {filteredProjects.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>
                    No matching projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Project;