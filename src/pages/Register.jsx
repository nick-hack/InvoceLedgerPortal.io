import 'bootstrap/dist/css/bootstrap.min.css';
import '../Register.css';

export default function Register() {
  return (
    <div className="register-container">
      <div className="row g-0 vh-100">
        <div className="col-md-6 d-flex align-items-center justify-content-center bg-gradient">
          <div className="text-center text-white px-5">
            <h1 className="animated-title">Join LedgerPro</h1>
            <p className="lead">Manage your invoices, billing, and ledgers with ease.</p>
            <img src="/finance-graphic.svg" alt="Finance Illustration" className="img-fluid mt-4 animated-img" />
          </div>
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="register-card shadow-lg p-5 w-100" style={{ maxWidth: '500px' }}>
            <h2 className="text-center mb-4">Create Your Account</h2>
            <form>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="name" placeholder="Full Name" />
                <label htmlFor="name">Full Name</label>
              </div>
              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="email" placeholder="name@example.com" />
                <label htmlFor="email">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input type="password" className="form-control" id="password" placeholder="Password" />
                <label htmlFor="password">Password</label>
              </div>
              <div className="form-floating mb-3">
                <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" />
                <label htmlFor="confirmPassword">Confirm Password</label>
              </div>
              <button type="submit" className="btn btn-primary w-100 animated-btn">Register</button>
            </form>
            <p className="text-center mt-3">
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}