import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sections/Sidebar';
import './Expenses.css';

const expenseData = [
  { id: 'EXP001', company: 'TechNova Pvt Ltd', user: 'USR123', category: 'Software', amount: 12000, date: '2025-10-01' },
  { id: 'EXP002', company: 'GreenByte Solutions', user: 'USR456', category: 'Hardware', amount: 8000, date: '2025-10-03' },
  { id: 'EXP003', company: 'TechNova Pvt Ltd', user: 'USR789', category: 'Software', amount: 5000, date: '2025-10-05' },
  { id: 'EXP004', company: 'FreshMart', user: 'USR321', category: 'Grocery', amount: 3000, date: '2025-10-07' },
  { id: 'EXP005', company: 'FreshMart', user: 'USR321', category: 'Grocery', amount: 1500, date: '2025-10-10' },
  // Add more entries as needed
];

const Expenses = () => {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState('Company');
  const [selectedValue, setSelectedValue] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const companies = [...new Set(expenseData.map((e) => e.company))];
  const users = [...new Set(expenseData.map((e) => e.user))];

  const filteredExpenses = expenseData.filter((e) => {
    const matchesFilter =
      selectedValue === 'All' ||
      (filterType === 'Company' ? e.company === selectedValue : e.user === selectedValue);

    const matchesSearch =
      e.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const totalPages = Math.ceil(filteredExpenses.length / pageSize);
  const paginatedExpenses = filteredExpenses.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleViewDetails = (id) => {
    navigate(`/expense/${id}`);
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prev) => {
      if (direction === 'prev') return Math.max(prev - 1, 1);
      if (direction === 'next') return Math.min(prev + 1, totalPages);
      return prev;
    });
  };

  return (
    <div className="expenses-page">
      <Sidebar />
      <div className="expenses-content">
        <div className="expenses-box">
          <h2>💰 Expenses</h2>

          <div className="expenses-filter">
            <label>Filter by:</label>
            <select value={filterType} onChange={(e) => {
              setFilterType(e.target.value);
              setSelectedValue('All');
              setCurrentPage(1);
            }}>
              <option value="Company">Company</option>
              <option value="User">User</option>
            </select>

            {filterType === 'Company' && (
              <select value={selectedValue} onChange={(e) => {
                setSelectedValue(e.target.value);
                setCurrentPage(1);
              }}>
                <option value="All">All Companies</option>
                {companies.map((company) => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>
            )}

            {filterType === 'User' && (
              <select value={selectedValue} onChange={(e) => {
                setSelectedValue(e.target.value);
                setCurrentPage(1);
              }}>
                <option value="All">All Users</option>
                {users.map((user) => (
                  <option key={user} value={user}>{user}</option>
                ))}
              </select>
            )}

            <label>Page Size:</label>
            <select value={pageSize} onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}>
              {[10, 20, 30, 50, 100].map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by company, user, or category..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <table className="expenses-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Company</th>
                {filterType === 'User' && <th>User</th>}
                <th>Category</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedExpenses.map((exp) => (
                <tr key={exp.id}>
                  <td>{exp.date}</td>
                  <td>{exp.company}</td>
                  {filterType === 'User' && <td>{exp.user}</td>}
                  <td>{exp.category}</td>
                  <td>₹{exp.amount.toFixed(2)}</td>
                  <td>
                    <button className="view-button" onClick={() => handleViewDetails(exp.id)}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
              {paginatedExpenses.length === 0 && (
                <tr>
                  <td colSpan={filterType === 'User' ? 6 : 5}>No expenses found.</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="pagination-controls">
            <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
              ◀ Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>
              Next ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;