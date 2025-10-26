import React, { useState } from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from 'chart.js';
import './ExpenseCharts.css';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

const mockData = [
  { id: 'EXP001', company: 'TechNova', category: 'Income', actual: 12000, debt: 2000, date: '2025-10-01' },
  { id: 'EXP003', company: 'TechNova', category: 'Savings', actual: 5000, debt: 500, date: '2025-10-05' },
  { id: 'EXP005', company: 'TechNova', category: 'Income', actual: 10000, debt: 1500, date: '2025-10-10' },
  { id: 'EXP007', company: 'TechNova', category: 'Savings', actual: 4000, debt: 300, date: '2025-10-15' },
];

const ExpenseDashboard = () => {
  const [startDate, setStartDate] = useState('2025-10-01');
  const [endDate, setEndDate] = useState('2025-10-31');
  const selectedCompany = 'TechNova';
  const targetAmount = 30000;

  const filteredData = mockData.filter(
    (item) =>
      item.date >= startDate &&
      item.date <= endDate &&
      item.company === selectedCompany
  );

  const categories = ['Income', 'Revenue', 'Savings', 'Bills'];

  const getCategoryData = (category) =>
    filteredData
      .filter((item) => item.category === category)
      .map((item) => ({
        ...item,
        difference: item.actual - item.debt,
      }));

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: 'Actual',
        data: categories.map((cat) =>
          getCategoryData(cat).reduce((sum, item) => sum + item.actual, 0)
        ),
        backgroundColor: '#007bff',
      },
      {
        label: 'Debt',
        data: categories.map((cat) =>
          getCategoryData(cat).reduce((sum, item) => sum + item.debt, 0)
        ),
        backgroundColor: '#dc3545',
      },
      {
        label: 'Difference',
        data: categories.map((cat) =>
          getCategoryData(cat).reduce((sum, item) => sum + item.difference, 0)
        ),
        backgroundColor: '#28a745',
      },
    ],
  };

  const getCompanyTotals = () => {
    const totalActual = filteredData.reduce((sum, item) => sum + item.actual, 0);
    const totalDebt = filteredData.reduce((sum, item) => sum + item.debt, 0);
    const totalDifference = totalActual - totalDebt;
    const targetAchieved = ((totalDifference / targetAmount) * 100).toFixed(2);
    return { totalActual, totalDebt, totalDifference, targetAchieved };
  };

  const { totalActual, totalDebt, totalDifference, targetAchieved } = getCompanyTotals();

  return (
    <div className="dashboard-container">
      <h2>📊 Expense Dashboard</h2>

      <div className="date-filter">
        <label>Start Date:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <label>End Date:</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <label>Company:</label>
        <input type="text" value={selectedCompany} disabled style={{ backgroundColor: '#eee', border: '1px solid #ccc', padding: '0.5rem' }} />
      </div>

      {/* <div className="company-summary">
        <div className="company-card">
          <h4>{selectedCompany}</h4>
          <p><strong>Total Revenue:</strong> ₹{totalActual.toFixed(2)}</p>
          <p><strong>Total Expenses:</strong> ₹{totalDebt.toFixed(2)}</p>
          <p><strong>Net Amount:</strong> ₹{totalDifference.toFixed(2)}</p>
          <p><strong>Target:</strong> ₹{targetAmount.toFixed(2)}</p>
          <p><strong>Target Achieved:</strong> {targetAchieved}%</p>
        </div>
      </div> */}

      <div className="metric-cards">
        <div className="metric-card">
          <h5>Total Revenue</h5>
          <p>₹{totalActual.toFixed(2)}</p>
        </div>
        <div className="metric-card">
          <h5>Total Expenses</h5>
          <p>₹{totalDebt.toFixed(2)}</p>
        </div>
        <div className="metric-card">
          <h5>Net Amount</h5>
          <p>₹{totalDifference.toFixed(2)}</p>
        </div>
        <div className="metric-card">
          <h5>Target</h5>
          <p>₹{targetAmount.toFixed(2)}</p>
        </div>
        <div className="metric-card">
          <h5>Target Achieved</h5>
          <p>{targetAchieved}%</p>
        </div>
      </div>

      <div className="chart-section">
        <div className="chart-card">
          <h4>Pie Chart</h4>
          <Pie data={chartData} />
        </div>
        <div className="chart-card">
          <h4>Bar Chart</h4>
          <Bar data={chartData} />
        </div>
        <div className="chart-card">
          <h4>Wave Chart</h4>
          <Line data={chartData} />
        </div>
      </div>

      <div className="table-pair-grid">
        {categories.map((cat, index) => {
          const rows = getCategoryData(cat);
          const table = (
            <div key={cat} className="table-section">
              <h4>{cat} Table</h4>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Actual</th>
                    <th>Debt</th>
                    <th>Difference</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td>{row.date}</td>
                      <td>₹{row.actual.toFixed(2)}</td>
                      <td>₹{row.debt.toFixed(2)}</td>
                      <td>₹{row.difference.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );

          if (index % 2 === 0) {
            const nextCat = categories[index + 1];
            const nextRows = nextCat ? getCategoryData(nextCat) : [];
            return (
              <div key={cat} className="table-pair">
                {table}
                {nextCat && (
                  <div key={nextCat} className="table-section">
                    <h4>{nextCat} Table</h4>
                    <table>
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Actual</th>
                          <th>Debt</th>
                          <th>Difference</th>
                        </tr>
                      </thead>
                      <tbody>
                        {nextRows.map((row) => (
                          <tr key={row.id}>
                            <td>{row.date}</td>
                            <td>₹{row.actual.toFixed(2)}</td>
                            <td>₹{row.debt.toFixed(2)}</td>
                            <td>₹{row.difference.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

export default ExpenseDashboard;