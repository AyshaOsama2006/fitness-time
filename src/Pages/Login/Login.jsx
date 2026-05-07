import { useState } from "react";
import "./Login.css";

export default function Login() {
  const [showSignup, setShowSignup] = useState(false);
  const [loading, setLoading] = useState(false);

  const showSignupForm = (e) => {
    e.preventDefault();
    setShowSignup(true);
  };

  const showLoginForm = (e) => {
    e.preventDefault();
    setShowSignup(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href = "/profile";

    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: e.target.firstName.value + " " + e.target.lastName.value,
          email: e.target.email.value,
          password: e.target.password.value,
          age: null,
          height: null,
          weight: null,
          activityLevel: null,
          fitnessGoal: null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      alert("Account created");
      setShowSignup(false);

    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">

      {!showSignup && (
        <div className="container-box">
          <div className="title">
            <h2><span>FITNESS</span> TIME</h2>
            <p>Login to your account</p>
          </div>

          <form onSubmit={handleLogin}>
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />

            <button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </button>

            {/* Guest link */}
            <span
              onClick={() => window.location.href = "/home"}
              className="guest-link"
            >
              Continue as Guest
            </span>

            <p>
              Don't have an account?
              <button onClick={showSignupForm} className="link-btn">
                Sign Up
              </button>
            </p>
          </form>
        </div>
      )}

      {showSignup && (
        <div className="container-box">
          <div className="title">
            <h2><span>FITNESS</span> TIME</h2>
            <p>Create new account</p>
          </div>

          <form onSubmit={handleSignup}>
            <input type="text" name="firstName" placeholder="First name" required />
            <input type="text" name="lastName" placeholder="Last name" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />

            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </button>

            <p>
              Already have an account?
              <button onClick={showLoginForm} className="link-btn">
                Login
              </button>
            </p>
          </form>
        </div>
      )}

    </div>
  );
}