import React from 'react';
import '../Sections/ChartCard.css';
import { FaUsers, FaBuilding, FaMoneyBillWave, FaChartLine, FaWarehouse } from 'react-icons/fa';

function ChartCard() {
  const data = [
    { title: 'Users', icon: <FaUsers />, count: '12,450' },
    { title: 'Companies', icon: <FaBuilding />, count: '1,230' },
    { title: 'Expenses', icon: <FaMoneyBillWave />, count: '₹ 8.2M' },
    { title: 'Revenue', icon: <FaChartLine />, count: '₹ 15.6M' },
    { title: 'Warehouse', icon: <FaWarehouse />, count: '42 Active' },
    // Example duplicate
    { title: 'Users', icon: <FaUsers />, count: '12,450' },
  ];

  // Filter out duplicates by title
  const uniqueData = data.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.title === item.title)
  );

  return (
    <div className="chart-card-container">
      {uniqueData.map((item, index) => (
        <div className="chart-card" key={index}>
          <div className="chart-card-header">
            <div className="chart-card-icon">{item.icon}</div>
            <h4>{item.title}</h4>
          </div>
          <div className="chart-card-body">
            <div className="chart-count">{item.count}</div>
            <div className="chart-placeholder">[Chart Placeholder]</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChartCard;