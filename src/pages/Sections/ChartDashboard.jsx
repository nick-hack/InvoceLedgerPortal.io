import React from 'react';
import { Bar, Pie, Line, Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import '../Sections/ChartDashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function ChartDashboard() {
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  const barData = {
    labels,
    datasets: [
      {
        label: 'Sales',
        data: [120, 190, 300, 500, 200, 300],
        backgroundColor: '#4e73df',
      },
    ],
  };

  const pieData = {
    labels: ['Electronics', 'Clothing', 'Grocery'],
    datasets: [
      {
        label: 'Category Share',
        data: [300, 150, 100],
        backgroundColor: ['#1cc88a', '#36b9cc', '#f6c23e'],
      },
    ],
  };

  const lineData = {
    labels,
    datasets: [
      {
        label: 'Visitors',
        data: [100, 200, 150, 300, 250, 400],
        fill: false,
        borderColor: '#e74a3b',
        tension: 0.4,
      },
    ],
  };

  const waveData = {
    labels,
    datasets: [
      {
        label: 'Wave Pattern',
        data: labels.map((_, i) => Math.sin(i) * 100 + 200),
        fill: true,
        backgroundColor: 'rgba(78, 115, 223, 0.2)',
        borderColor: '#4e73df',
        tension: 0.5,
      },
    ],
  };

  const scatterData = {
    datasets: [
      {
        label: 'Scatter Dataset',
        data: [
          { x: 10, y: 20 },
          { x: 15, y: 10 },
          { x: 20, y: 30 },
          { x: 25, y: 15 },
          { x: 30, y: 25 },
        ],
        backgroundColor: '#858796',
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">📊 Analytics Overview</h2>
      <div className="charts-grid">
        <div className="chart-cards"><Bar data={barData} /></div>
        <div className="chart-cards"><Pie data={pieData} /></div>
        <div className="chart-cards"><Line data={lineData} /></div>
        <div className="chart-cards"><Line data={waveData} /></div>
        <div className="chart-cards"><Scatter data={scatterData} /></div>
      </div>
    </div>
  );
}

export default ChartDashboard;