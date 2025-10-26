import { BrowserRouter, Routes, Route } from 'react-router-dom';
 import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/submenus/Users';
import Companies from '../pages/submenus/Companies';
import Project from '../pages/submenus/Projects';
import ProjectDetails from '../pages/submenus/ProjectDetails';
import ProjectTracker from '../pages/submenus/ProjectTracker';
import Invoices from '../pages/submenus/Invoices';
import InvoiceDetails from '../pages/submenus/InvoiceDetails';
import Ledger from '../pages/submenus/Ledger';
import Expenses from '../pages/submenus/Expenses';
import ExpenseCharts from '../pages/submenus/ExpensesCharts';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Companies" element={<Companies />} />
        <Route path="/Projects" element={<Project />} />
       <Route path="/Invoices" element={<Invoices />} />
       <Route path="/invoice/:invoiceId" element={<InvoiceDetails />} />
        <Route path="/ledgers" element={<Ledger />} />
        <Route path="/Expenses" element={<Expenses/>}/>
        <Route path="/expense/:expenseId" element={<ExpenseCharts />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/project/:id/tracker" element={<ProjectTracker />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}