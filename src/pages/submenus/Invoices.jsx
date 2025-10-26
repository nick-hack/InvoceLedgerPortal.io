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

const demoInvoices = [
  {
    invoiceId: 'INV001',
    invoiceNumber: '2025-INV-001',
    companyName: 'TechNova Pvt Ltd',
    userId: 'USR123',
    category: 'Software Development',
    invoiceType: 'Service',
  },
  {
    invoiceId: 'INV002',
    invoiceNumber: '2025-INV-002',
    companyName: 'GreenByte Solutions',
    userId: 'USR456',
    category: 'Hardware',
    invoiceType: 'Product',
  },
  {
    invoiceId: 'INV003',
    invoiceNumber: '2025-INV-003',
    companyName: 'Skyline Systems',
    userId: 'USR789',
    category: 'Electronics',
    invoiceType: 'Product',
  },
  {
    invoiceId: 'INV004',
    invoiceNumber: '2025-INV-004',
    companyName: 'FreshMart',
    userId: 'USR321',
    category: 'Grocery',
    invoiceType: 'Retail',
  },
  {
    invoiceId: 'INV005',
    invoiceNumber: '2025-INV-005',
    companyName: 'Urban Supplies',
    userId: 'USR654',
    category: 'Others',
    invoiceType: 'Wholesale',
  },
];

const InvoiceList = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleViewDetails = (invoiceId) => {
    navigate(`/invoice/${invoiceId}`);
  };

  const categories = ['All', ...new Set(demoInvoices.map(inv => inv.category))];

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredByCategory =
    selectedCategory === 'All'
      ? demoInvoices
      : demoInvoices.filter(inv => inv.category === selectedCategory);

  const filteredInvoices = filteredByCategory.filter(inv =>
    inv.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.invoiceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.invoiceType.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h2>🧾 Invoices by Category</h2>

          <div className="category-ui">
            <label htmlFor="category-select" className="category-label">📂 Choose Category:</label>
            
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="category-dropdown"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
<br />
          <input
            type="text"
            placeholder="🔍 Search invoices..."
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
                <th>Company Name</th>
                <th>User ID</th>
                <th>Invoice ID</th>
                <th>Invoice Number</th>
                <th>Invoice Type</th>
                <th>GST (%)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedInvoices.map((invoice) => (
                <tr key={invoice.invoiceId}>
                  <td>{invoice.companyName}</td>
                  <td>{invoice.userId}</td>
                  <td>{invoice.invoiceId}</td>
                  <td>{invoice.invoiceNumber}</td>
                  <td>{invoice.invoiceType}</td>
                  <td>{gstRates[invoice.category] || 'N/A'}</td>
                  <td>
                    <button
                      className="view-button"
                      onClick={() => handleViewDetails(invoice.invoiceId)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
              {paginatedInvoices.length === 0 && (
                <tr>
                  <td colSpan="7">No invoices found for this category.</td>
                </tr>
              )}
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

export default InvoiceList;