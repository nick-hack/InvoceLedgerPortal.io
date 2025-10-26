import React, { useState } from 'react';
import './Users.css';
import Sidebar from '../Sections/Sidebar';
import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const Companies = () => {
  const [activeTab, setActiveTab] = useState('AllCompanies');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [formMode, setFormMode] = useState('view');
  const [newCompany, setNewCompany] = useState({ name: '', email: '', industry: '', status: 'Active' });

  const [companyLists, setCompanyLists] = useState({
    AllCompanies: [
      { name: 'Acme Corp', email: 'contact@acme.com', industry: 'Manufacturing', status: 'Active' },
      { name: 'Globex', email: 'info@globex.com', industry: 'Technology', status: 'Active' },
    ],
    ActiveCompanies: [
      { name: 'Initech', email: 'support@initech.com', industry: 'Software', status: 'Active' },
    ],
    DeletedCompanies: [
      { name: 'Umbrella Inc', email: 'admin@umbrella.com', industry: 'Pharma', status: 'Deleted' },
    ],
  });

  const handleDelete = (index) => {
    const updated = [...companyLists[activeTab]];
    updated.splice(index, 1);
    setCompanyLists({ ...companyLists, [activeTab]: updated });
  };

  const handleToggleStatus = (index) => {
    const updated = [...companyLists[activeTab]];
    updated[index].status = updated[index].status === 'Active' ? 'Inactive' : 'Active';
    setCompanyLists({ ...companyLists, [activeTab]: updated });
  };

  const handleAddCompany = (e) => {
    e.preventDefault();
    const updated = [...companyLists[activeTab], newCompany];
    setCompanyLists({ ...companyLists, [activeTab]: updated });
    setNewCompany({ name: '', email: '', industry: '', status: 'Active' });
    setShowAddModal(false);
  };

  const handleViewCompany = (company) => {
    setSelectedCompany(company);
    setFormMode('view');
  };

  const handleEditCompany = (company, index) => {
    setSelectedCompany({ ...company, index });
    setFormMode('edit');
  };

  const handleUpdateCompany = (e) => {
    e.preventDefault();
    const updatedCompanies = [...companyLists[activeTab]];
    updatedCompanies[selectedCompany.index] = {
      name: selectedCompany.name,
      email: selectedCompany.email,
      industry: selectedCompany.industry,
      status: selectedCompany.status,
    };
    setCompanyLists({ ...companyLists, [activeTab]: updatedCompanies });
    setSelectedCompany(null);
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredCompanies = companyLists[activeTab].filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const paginatedCompanies = filteredCompanies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderCompanies = () => (
    <div className="tab-pane fade show active">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>{activeTab}</h5>
        <button className="add-user-btn" onClick={() => setShowAddModal(true)}>
          <FaPlus /> Add Company
        </button>
      </div>

      <input
        type="text"
        placeholder="Search companies..."
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
          <option value={30}>30</option>
        </select>
      </div>

      <div className="table-wrapper mt-3">
        <table className="user-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Industry</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCompanies.map((company, idx) => (
              <tr key={idx}>
                <td>{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                <td>{company.name}</td>
                <td>{company.email}</td>
                <td>{company.industry}</td>
                <td>
                  <button
                    className={`status-btn ${company.status.toLowerCase()}`}
                    onClick={() => handleToggleStatus(idx)}
                  >
                    {company.status}
                  </button>
                </td>
                <td className="icon-actions">
                  <FaEye className="icon view-icon" title="View" onClick={() => handleViewCompany(company)} />
                  <FaEdit className="icon edit-icon" title="Edit" onClick={() => handleEditCompany(company, idx)} />
                  <FaTrash className="icon delete-icon" title="Delete" onClick={() => handleDelete(idx)} />
                </td>
              </tr>
            ))}
            {paginatedCompanies.length === 0 && (
              <tr>
                <td colSpan="6">No companies found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
  );

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4">
        <div className="users-container">
          <ul className="nav nav-pills mb-3" role="tablist">
            {Object.keys(companyLists).map((tab) => (
              <li className="nav-item" role="presentation" key={tab}>
                <button
                  className={`nav-link position-relative ${activeTab === tab ? 'active' : ''}`}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab);
                    setSearchTerm('');
                    setCurrentPage(1);
                  }}
                >
                  {tab}
                  <span className="badge bg-danger">{companyLists[tab].length}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="tab-content">{renderCompanies()}</div>
        </div>
      </div>

      {/* Add Company Modal */}
      {showAddModal && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <h5>Add New Company</h5>
            <form className="add-user-form" onSubmit={handleAddCompany}>
              <input
                type="text"
                placeholder="Name"
                value={newCompany.name}
                onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={newCompany.email}
                onChange={(e) => setNewCompany({ ...newCompany, email: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Industry"
                value={newCompany.industry}
                onChange={(e) => setNewCompany({ ...newCompany, industry: e.target.value })}
                required
              />
              <div className="modal-actions">
                <button type="submit">Add</button>
                <button type="button" className="cancel-btn" onClick={() => setShowAddModal(false)}>
                  Cancel
                               </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View/Edit Modal */}
      {selectedCompany && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <h5>{formMode === 'view' ? 'View Company' : 'Edit Company'}</h5>
            <form
              className="add-user-form"
              onSubmit={formMode === 'edit' ? handleUpdateCompany : (e) => e.preventDefault()}
            >
              <input
                type="text"
                value={selectedCompany.name}
                disabled={formMode === 'view'}
                onChange={(e) => setSelectedCompany({ ...selectedCompany, name: e.target.value })}
              />
              <input
                type="email"
                value={selectedCompany.email}
                disabled={formMode === 'view'}
                onChange={(e) => setSelectedCompany({ ...selectedCompany, email: e.target.value })}
              />
              <input
                type="text"
                value={selectedCompany.industry}
                disabled={formMode === 'view'}
                onChange={(e) => setSelectedCompany({ ...selectedCompany, industry: e.target.value })}
              />
              <div className="modal-actions">
                {formMode === 'edit' && <button type="submit">Update</button>}
                <button type="button" className="cancel-btn" onClick={() => setSelectedCompany(null)}>
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Companies;