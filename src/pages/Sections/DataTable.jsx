import React from 'react';
import '../Sections/DataTable.css'; // Add this for custom styles

function DataTable() {
  return (
    <div className="data-table">
   <h4 style={{ textAlign: 'center' }}>📊 Records</h4>

    <div className="table-wrapper">
      <div className="table-container">
        <h5>Client Payments</h5>
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Client</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>ABC Corp</td><td>$1,200</td><td><span className="badge bg-success">Paid</span></td></tr>
              <tr><td>2</td><td>XYZ Ltd</td><td>$950</td><td><span className="badge bg-warning text-dark">Pending</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="table-container">
        <h5>Vendor Invoices</h5>
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Vendor</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>Global Inc</td><td>$2,500</td><td><span className="badge bg-danger">Overdue</span></td></tr>
              <tr><td>2</td><td>Delta LLC</td><td>$1,100</td><td><span className="badge bg-success">Paid</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
}

export default DataTable;