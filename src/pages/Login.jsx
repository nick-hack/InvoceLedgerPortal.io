import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Login.css';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // prevent page reload
    // You can add validation or API call here
    navigate('/dashboard'); // redirect to dashboard
  };

  return (
    <div className="login-container">
      <div className="row g-0 vh-100">
        {/* Left Side: Welcome Illustration */}
        <div className="col-md-6 d-flex align-items-center justify-content-center bg-gradient">
          <div className="text-center text-white px-5">
            <h1 className="animated-title">Welcome Back</h1>
            <p className="lead">Access your billing, invoices, and ledger dashboard.</p>
            <img src="/finance-graphic.svg" alt="Finance Illustration" className="img-fluid mt-4 animated-img" />
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="card shadow-lg p-5 w-100" style={{ maxWidth: '400px' }}>
            <h3 className="text-center mb-4 animated-title">Login</h3>
            <form onSubmit={handleLogin}>
              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="email" placeholder="name@example.com" required />
                <label htmlFor="email">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input type="password" className="form-control" id="password" placeholder="Password" required />
                <label htmlFor="password">Password</label>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="remember" />
                  <label className="form-check-label" htmlFor="remember">Remember me</label>
                </div>
                <a href="#" className="text-decoration-none">Forgot password?</a>
              </div>
              <button type="submit" className="btn btn-primary w-100 animated-btn">Login</button>
            </form>
            <p className="text-center mt-3">
              Don't have an account? <a href="/register">Register</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}