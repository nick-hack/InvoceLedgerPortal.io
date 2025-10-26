import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Invoices.css';
import Sidebar from '../Sections/Sidebar';

const gstRates = {
  'Software Development': 18,
  'Hardware': 12,
  'Electronics': 18,
  'Grocery': 5,
  'Others': 10,
};

// Sample ledger-style invoice data
const ledgerInvoices = [
  {
    invoiceId: 'INV001',
    invoiceNumber: '2025-INV-001',
    companyName: 'TechNova Pvt Ltd',
    userId: 'USR123',
    category: 'Software Development',
    invoiceType: 'Service',
    amount: 10000,
    date: '2025-10-01',
  },
  {
    invoiceId: 'INV002',
    invoiceNumber: '2025-INV-002',
    companyName: 'GreenByte Solutions',
    userId: 'USR456',
    category: 'Hardware',
    invoiceType: 'Product',
    amount: 5000,
    date: '2025-10-03',
  },
  {
    invoiceId: 'INV003',
    invoiceNumber: '2025-INV-003',
    companyName: 'Skyline Systems',
    userId: 'USR789',
    category: 'Electronics',
    invoiceType: 'Product',
    amount: 8000,
    date: '2025-10-05',
  },
  {
    invoiceId: 'INV004',
    invoiceNumber: '2025-INV-004',
    companyName: 'FreshMart',
    userId: 'USR321',
    category: 'Grocery',
    invoiceType: 'Retail',
    amount: 2000,
    date: '2025-10-07',
  },
  {
    invoiceId: 'INV005',
    invoiceNumber: '2025-INV-005',
    companyName: 'Urban Supplies',
    userId: 'USR654',
    category: 'Others',
    invoiceType: 'Wholesale',
    amount: 3000,
    date: '2025-10-10',
  },
];

const Ledger = () => {
  const navigate = useNavigate();
  let runningBalance = 0;

  const handleViewDetails = (invoiceId) => {
    navigate(`/invoice/${invoiceId}`);
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredInvoices = ledgerInvoices.filter((entry) =>
    entry.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.invoiceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const paginatedInvoices = filteredInvoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="invoice-page">
      <Sidebar />
      <div className="invoice-content">
        <div className="invoice-box">
          <h2>📒 Ledger View</h2>

          <input
            type="text"
            placeholder="Search by company, invoice ID, or category..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="search-input"
          />

          <div className="page-size-selector">
            <label>Show per page: </label>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>

          <table className="invoice-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Invoice ID</th>
                <th>Category</th>
                <th>Amount</th>
                <th>GST (%)</th>
                <th>GST Amount</th>
                <th>Total</th>
                <th>Balance</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedInvoices.map((entry) => {
                const gstRate = gstRates[entry.category] || 0;
                const gstAmount = (entry.amount * gstRate) / 100;
                const total = entry.amount + gstAmount;
                runningBalance += total;

                return (
                  <tr key={entry.invoiceId}>
                    <td>{entry.date}</td>
                    <td>{entry.companyName} ({entry.invoiceType})</td>
                    <td>{entry.invoiceId}</td>
                    <td>{entry.category}</td>
                    <td>₹{entry.amount.toFixed(2)}</td>
                    <td>{gstRate}%</td>
                    <td>₹{gstAmount.toFixed(2)}</td>
                    <td>₹{total.toFixed(2)}</td>
                    <td>₹{runningBalance.toFixed(2)}</td>
                    <td>
                      <button
                        className="view-button"
                        onClick={() => handleViewDetails(entry.invoiceId)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              ◀ Prev
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ledger;