// src/pages/InvoiceDetails.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import './InvoiceDetails.css';

const demoInvoiceData = {
  INV001: {
    invoiceNumber: '2025-INV-001',
    date: '2025-10-20',
    company: {
      name: 'TechNova Pvt Ltd',
      owner: 'Rajesh Kumar',
      projectManager: 'Anita Desai',
      employees: [
        { name: 'Amit Sharma', role: 'Frontend Developer' },
        { name: 'Priya Verma', role: 'Backend Developer' },
        { name: 'Kunal Joshi', role: 'UI/UX Designer' }
      ]
    },
    items: [
      { description: 'Website Development', quantity: 1, unitPrice: 50000 },
      { description: 'SEO Optimization', quantity: 1, unitPrice: 15000 },
      { description: 'Maintenance (6 months)', quantity: 1, unitPrice: 12000 }
    ],
    gstRate: 0.18,
    taxRate: 0.05
  }
};

const InvoiceDetails = () => {
  const { invoiceId } = useParams();
  const invoice = demoInvoiceData[invoiceId];

  if (!invoice) return <p>Invoice not found.</p>;

  const subtotal = invoice.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const gst = subtotal * invoice.gstRate;
  const tax = subtotal * invoice.taxRate;
  const total = subtotal + gst + tax;

  return (
    <div className="invoice-details-container">
      <h2>🧾 Invoice #{invoice.invoiceNumber}</h2>
      <p><strong>Date:</strong> {invoice.date}</p>

      <div className="company-info">
        <h3>🏢 Company Information</h3>
        <p><strong>Name:</strong> {invoice.company.name}</p>
        <p><strong>Owner:</strong> {invoice.company.owner}</p>
        <p><strong>Project Manager:</strong> {invoice.company.projectManager}</p>
        <h4>👥 Employees</h4>
        <ul>
          {invoice.company.employees.map((emp, idx) => (
            <li key={idx}>{emp.name} – {emp.role}</li>
          ))}
        </ul>
      </div>

      <table className="invoice-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, idx) => (
            <tr key={idx}>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>₹{item.unitPrice.toLocaleString()}</td>
              <td>₹{(item.quantity * item.unitPrice).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr><td colSpan="3"><strong>Subtotal</strong></td><td>₹{subtotal.toLocaleString()}</td></tr>
          <tr><td colSpan="3"><strong>GST (18%)</strong></td><td>₹{gst.toLocaleString()}</td></tr>
          <tr><td colSpan="3"><strong>Tax (5%)</strong></td><td>₹{tax.toLocaleString()}</td></tr>
          <tr><td colSpan="3"><strong>Total</strong></td><td>₹{total.toLocaleString()}</td></tr>
        </tfoot>
      </table>
    </div>
  );
};

export default InvoiceDetails;