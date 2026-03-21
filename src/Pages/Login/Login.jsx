import { useState } from "react";
import "./Login.css";

export default function Login() {
  const [showSignup, setShowSignup] = useState(false);

  const showSignupForm = (e) => {
    e.preventDefault();
    setShowSignup(true);
  };

  const showLoginForm = (e) => {
    e.preventDefault();
    setShowSignup(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="login-wrapper">
      {!showSignup && (
        <div className="container-box">
          <div className="title">
            <h2><span>FITNESS</span> TIME</h2>
            <p>Login to your account</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fs-5">Email</label>
              <input type="email" name="email" className="form-control" placeholder="Enter email"/>
            </div>

            <div className="mb-3">
              <label className="form-label fs-5">Password</label>
              <input type="password" name="password" className="form-control" placeholder="Enter password"/>
            </div>

            <div className="remember">
              <input type="checkbox" name="remember"/>
              <label>Remember me</label>
            </div>

            <button type="submit" className="btn btn-main fs-5 mb-3 fw-bold">Login</button>

            <a href="/home" className=" guest btn btn-danger  opacity-50 w-100 fw-bold ">
              Continue as Guest
            </a>

            <div className="switch-text mt-1">
              Don't have an account?
              <a href="#" onClick={showSignupForm}> Sign Up</a>
            </div>
          </form>
        </div>
      )}

      {showSignup && (
        <div className="container-box signup-form">
          <div className="title ">
            <h2><span>FITNESS</span> TIME</h2>
            <p>Create new account</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fs-5">First Name</label>
              <input type="text" name="firstName" className="form-control" placeholder="First name"/>
            </div>

            <div className="mb-3">
              <label className="form-label fs-5">Last Name</label>
              <input type="text" name="lastName" className="form-control" placeholder="Last name"/>
            </div>

            <div className="mb-3">
              <label className="form-label fs-5">Email</label>
              <input type="email" name="email" className="form-control" placeholder="Enter email"/>
            </div>

            <div className="mb-3">
              <label className="form-label fs-5">Password</label>
              <input type="password" name="password" className="form-control" placeholder="Create password"/>
            </div>

            <button type="submit" className="btn btn-main fs-5 fw-bold">Create Account</button>

            <div className="switch-text">
              Already have an account?
              <a href="#" onClick={showLoginForm}> Login</a>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}