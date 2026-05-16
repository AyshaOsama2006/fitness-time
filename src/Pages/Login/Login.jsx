import { useState } from "react";
import "./Login.css";

const getRoleFromToken = (token) => {
  if (!token) return null;
  const payload = token.split(".")[1];
  if (!payload) return null;
  try {
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    const decoded = JSON.parse(atob(padded));
    return decoded?.role || null;
  } catch (err) {
    return null;
  }
};

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
      const res = await fetch("https://fitness-time-backend-production.up.railway.app/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      const tokenRole = getRoleFromToken(data.token);
      const baseUser = data.user && typeof data.user === "object" ? data.user : {};
      const storedUser = { ...baseUser, role: baseUser.role ?? tokenRole };

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(storedUser));

      alert("Login successful");
      window.location.href = "/profile";
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = {
        name: `${e.target.firstName.value} ${e.target.lastName.value}`,
        email: e.target.email.value,
        password: e.target.password.value,
        age: e.target.age.value ? parseInt(e.target.age.value) : null,
        height: e.target.height.value ? parseFloat(e.target.height.value) : null,
        weight: e.target.weight.value ? parseFloat(e.target.weight.value) : null,
        activityLevel: e.target.activityLevel.value || null,
        fitnessGoal: e.target.fitnessGoal.value || null,
      };

      const res = await fetch("https://fitness-time-backend-production.up.railway.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Signup failed");

      alert("Account created successfully! Please login.");
      setShowSignup(false);
      e.target.reset(); 

    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      {!showSignup ? (
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
            <span onClick={() => window.location.href = "/home"} className="guest-link">
              Continue as Guest
            </span>
            <p>
              Don't have an account?
              <button type="button" onClick={showSignupForm} className="link-btn">Sign Up</button>
            </p>
          </form>
        </div>
      ) : (
        <div className="container-box">
          <div className="title">
            <h2><span>FITNESS</span> TIME</h2>
            <p>Create new account</p>
          </div>

          <form onSubmit={handleSignup}>
            <div className="form-row">
              <input type="text" name="firstName" placeholder="First name" required />
              <input type="text" name="lastName" placeholder="Last name" required />
            </div>

            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" minLength="6" required />

            <div className="form-row">
              <input 
                type="number" 
                name="age" 
                placeholder="Age" 
                min="10" 
                max="100"
              />
              <input 
                type="number" 
                name="height" 
                placeholder="Height (cm)" 
                min="100" 
                max="250"
              />
              <input 
                type="number" 
                name="weight" 
                placeholder="Weight (kg)" 
                min="30" 
                max="300"
                step="0.1"
              />
            </div>

            <select name="activityLevel" className="form-select">
              <option value="">Select Activity Level</option>
              <option value="sedentary">Sedentary (little or no exercise)</option>
              <option value="light">Lightly Active (1-3 days/week)</option>
              <option value="moderate">Moderately Active (3-5 days/week)</option>
              <option value="active">Very Active (6-7 days/week)</option>
              <option value="extreme">Extra Active (very hard exercise)</option>
            </select>

            <select name="fitnessGoal" className="form-select">
              <option value="">Select Fitness Goal</option>
              <option value="weight-loss">Weight Loss</option>
              <option value="muscle-gain">Muscle Gain</option>
              <option value="maintenance">Maintenance</option>
              <option value="endurance">Improve Endurance</option>
              <option value="flexibility">Improve Flexibility</option>
            </select>

            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </button>

            <p>
              Already have an account?
              <button type="button" onClick={showLoginForm} className="link-btn">Login</button>
            </p>
          </form>
        </div>
      )}
    </div>
  );
}