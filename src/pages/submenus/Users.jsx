import React, { useState } from 'react';
import './Users.css';
import Sidebar from '../Sections/Sidebar';
import { FaEye, FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa';

const Users = () => {
  const [activeTab, setActiveTab] = useState('AllUsers');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formMode, setFormMode] = useState('view');
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '', status: 'Active' });

  const [userLists, setUserLists] = useState({
    AllUsers: [
      { name: 'Alice', email: 'alice@example.com', role: 'User', status: 'Active' },
      { name: 'Bob', email: 'bob@example.com', role: 'User', status: 'Active' },
    ],
    ActiveUsers: [
      { name: 'Charlie', email: 'charlie@example.com', role: 'Admin', status: 'Active' },
    ],
    DeleteUsers: [
      { name: 'Dave', email: 'dave@example.com', role: 'Guest', status: 'Deleted' },
    ],
  });

  const handleDelete = (index) => {
    const updated = [...userLists[activeTab]];
    updated.splice(index, 1);
    setUserLists({ ...userLists, [activeTab]: updated });
  };

  const handleToggleStatus = (index) => {
    const updated = [...userLists[activeTab]];
    updated[index].status = updated[index].status === 'Active' ? 'Deactive' : 'Active';
    setUserLists({ ...userLists, [activeTab]: updated });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const updated = [...userLists[activeTab], newUser];
    setUserLists({ ...userLists, [activeTab]: updated });
    setNewUser({ name: '', email: '', role: '', status: 'Active' });
    setShowAddModal(false);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setFormMode('view');
  };

  const handleEditUser = (user, index) => {
    setSelectedUser({ ...user, index });
    setFormMode('edit');
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    const updatedUsers = [...userLists[activeTab]];
    updatedUsers[selectedUser.index] = {
      name: selectedUser.name,
      email: selectedUser.email,
      role: selectedUser.role,
      status: selectedUser.status,
    };
    setUserLists({ ...userLists, [activeTab]: updatedUsers });
    setSelectedUser(null);
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filteredUsers = userLists[activeTab].filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderUsers = () => (
    <div className="tab-pane fade show active">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>{activeTab}</h5>
        <button className="add-user-btn" onClick={() => setShowAddModal(true)}>
          <FaUserPlus /> Add User
        </button>
      </div>

      <input
        type="text"
        placeholder="Search users..."
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
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      <div className="table-wrapper mt-3">
        <table className="user-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user, idx) => (
              <tr key={idx}>
                <td>{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className={`status-btn ${user.status.toLowerCase()}`}
                    onClick={() => handleToggleStatus(idx)}
                  >
                    {user.status}
                  </button>
                </td>
                <td className="icon-actions">
                  <FaEye className="icon view-icon" title="View" onClick={() => handleViewUser(user)} />
                  <FaEdit className="icon edit-icon" title="Edit" onClick={() => handleEditUser(user, idx)} />
                  <FaTrash className="icon delete-icon" title="Delete" onClick={() => handleDelete(idx)} />
                </td>
              </tr>
            ))}
            {paginatedUsers.length === 0 && (
              <tr>
                <td colSpan="6">No users found.</td>
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
            {Object.keys(userLists).map((tab) => (
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
                  <span className="badge bg-danger">
                    {userLists[tab].length}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="tab-content">{renderUsers()}</div>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <h5>Add New User</h5>
            <form className="add-user-form" onSubmit={handleAddUser}>
              <input
                type="text"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Role"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
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
      {selectedUser && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <h5>{formMode === 'view' ? 'View User' : 'Edit User'}</h5>
            <form
              className="add-user-form"
              onSubmit={formMode === 'edit' ? handleUpdateUser : (e) => e.preventDefault()}
            >
              <input
                type="text"
                value={selectedUser.name}
                disabled={formMode === 'view'}
                onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
              />
              <input
                type="email"
                value={selectedUser.email}
                disabled={formMode === 'view'}
                onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
              />
              <input
                type="text"
                value={selectedUser.role}
                disabled={formMode === 'view'}
                onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
              />
              <div className="modal-actions">
                {formMode === 'edit' && <button type="submit">Update</button>}
                <button type="button" className="cancel-btn" onClick={() => setSelectedUser(null)}>
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

export default Users;