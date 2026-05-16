// src/components/Profile.jsx

import React, { useState, useEffect } from "react";
import "./Profile.css";

const API_BASE = "http://localhost:5000";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [nutrition, setNutrition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);

        const userStr = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (!userStr || !token) {
          window.location.href = "/login";
          return;
        }

        const user = JSON.parse(userStr);

        // GET USER PROFILE

        const res = await fetch(`${API_BASE}/users/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            localStorage.clear();
            window.location.href = "/login";
            return;
          }

          throw new Error("Failed to fetch profile");
        }

        const userData = await res.json();

        setProfile(userData);

        // GET NUTRITION DATA



        const emptyNutrition = {
  calories: { current: 0, target: 2500 },
  protein: { current: 0, target: 180 },
  carbs: { current: 0, target: 300 },
  fat: { current: 0, target: 80 },
}; 

       try {
  const nutritionRes = await fetch(`${API_BASE}/nutrition/${user.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (nutritionRes.ok) {
    const nutritionData = await nutritionRes.json();

    console.log("Nutrition Data:", nutritionData);

    setNutrition({
      calories: {
        current: nutritionData.calories || 0,
        target: 2500,
      },

      protein: {
        current: nutritionData.protein || 0,
        target: 180,
      },

      carbs: {
        current: nutritionData.carbs || 0,
        target: 300,
      },

      fat: {
        current: nutritionData.fat || 0,
        target: 80,
      },
    });
  } else {
    setNutrition(emptyNutrition);
  }
} catch (err) {
  console.log("Nutrition Error:", err);

  setNutrition(emptyNutrition);
}
        setError(null);
      } catch (err) {
        console.error("Error fetching profile:", err);

        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // LOGOUT

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  // DELETE ACCOUNT

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?",
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const user = JSON.parse(localStorage.getItem("user"));

      const res = await fetch(`${API_BASE}/users/${user.id}`, {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete account");
      }

      localStorage.clear();

      alert("Account deleted successfully");

      window.location.href = "/login";
    } catch (err) {
      console.error(err);

      alert(err.message);
    }
  };

  // LOADING

  if (loading) {
    return (
      <div className="container mt-5 text-center text-white">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // ERROR

  if (error) {
    return (
      <div className="container mt-5 text-center text-danger">
        <h4>Error: {error}</h4>

        <button
          className="btn btn-outline-light mt-3"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  // BMI

  const bmi =
    profile.height && profile.weight
      ? (profile.weight / Math.pow(profile.height / 100, 2)).toFixed(1)
      : "N/A";

  return (
    <>
      {/* HEADER */}

      <header className="container mt-5">
        <div className="profile-header">
          <div className="header-text">
            <h1 className="fw-bold text-white">YOUR PROFILE</h1>

            <p className="text-white fs-4 subtitle mb-0">
              Track your progress and manage your fitness journey
            </p>
          </div>

          <div className="header-actions">
            <button className="btn logout-btn" onClick={handleLogout}>
              Logout
            </button>

            <button className="btn delete-btn" onClick={handleDeleteAccount}>
              Delete Account
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}

      <section className="container mt-4">
        <div className="row g-4">
          {/* LEFT CARD */}

          <div className="col-lg-4 col-md-12">
            <div className="card profile-card mb-0">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                className="rounded-circle d-block mx-auto my-4 mb-2 profile-img"
                alt="Profile"
                width="120"
                height="120"
              />

              <div className="card-body text-center">
                <h5 className="card-title text-white fw-bold fs-3">
                  {profile.name || "User"}
                </h5>

                <p className="member-text">
  {profile.role || "User"}
</p>
              </div>

              <ul className="list-group list-group-flush mt-3 gap-3">
                <li className="list-group-item profile-item">
                  <div className="d-flex justify-content-between">
                    <span className="label">Age</span>
                    <span className="value">{profile.age || "-"}</span>
                  </div>
                </li>

                <li className="list-group-item profile-item">
                  <div className="d-flex justify-content-between">
                    <span className="label">Height</span>

                    <span className="value">
                      {profile.height ? `${profile.height} cm` : "-"}
                    </span>
                  </div>
                </li>

                <li className="list-group-item profile-item">
                  <div className="d-flex justify-content-between">
                    <span className="label">Weight</span>

                    <span className="value">
                      {profile.weight ? `${profile.weight} kg` : "-"}
                    </span>
                  </div>
                </li>

                <li className="list-group-item profile-item">
                  <div className="d-flex justify-content-between">
                    <span className="label">Goal</span>

                    <span className="goal-text">
                      {profile.fitnessGoal || "-"}
                    </span>
                  </div>
                </li>

                <li className="list-group-item profile-item mb-5">
                  <div className="d-flex justify-content-between">
                    <span className="label">Member Since</span>

                    <span className="value">
                      {profile.createdAt
                        ? new Date(profile.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              year: "numeric",
                            },
                          )
                        : "-"}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT SIDE */}

          <div className="col-lg-8 col-md-12">
            {/* BODY STATS */}

            <div className="card section-card p-4 mb-4">
              <h4 className="section-title">BODY STATISTICS</h4>

              <div className="row g-4">
                <div className="col-md-4">
                  <div className="stat-box">
                    <p className="stat-label">Current Weight</p>

                    <h2 className="stat-number">{profile.weight || "-"}kg</h2>

                    <p className="success-text">Healthy Weight</p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="stat-box">
                    <p className="stat-label">BMI</p>

                    <h2 className="stat-number">{bmi}</h2>

                    <p className="success-text">
                      {bmi !== "N/A"
                        ? bmi < 18.5
                          ? "Underweight"
                          : bmi < 25
                            ? "Normal"
                            : "Overweight"
                        : "-"}
                    </p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="stat-box">
                    <p className="stat-label">Body Fat</p>

                    <h2 className="stat-number">
                      {bmi !== "N/A" ? `${Math.round(bmi * 1.2)}%` : "-"}
                    </h2>

                    <p className="success-text">
                      {bmi !== "N/A"
                        ? bmi < 18.5
                          ? "Low Fat"
                          : bmi < 25
                            ? "Healthy Range"
                            : "High Fat"
                        : "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* NUTRITION */}

            <div className="card section-card p-4">
              <h4 className="section-title">DAILY NUTRITION TARGETS</h4>

              {nutrition &&
                ["calories", "protein", "carbs", "fat"].map((key) => {
                  const item = nutrition[key];

                  const percent = item.target
                    ? Math.min((item.current / item.target) * 100, 100)
                    : 0;

                  const labels = {
                    calories: {
                      name: "Calories",
                      unit: "kcal",
                    },

                    protein: {
                      name: "Protein",
                      unit: "g",
                    },

                    carbs: {
                      name: "Carbohydrates",
                      unit: "g",
                    },

                    fat: {
                      name: "Fat",
                      unit: "g",
                    },
                  };

                  return (
                    <div className="mb-4" key={key}>
                      <div className="d-flex justify-content-between text-white mb-1">
                        <span className="stat-label">{labels[key].name}</span>

                        <span className="fw-bold">
                          {item.current} / {item.target} {labels[key].unit}
                        </span>
                      </div>

                      <div className="progress custom-progress">
                        <div
                          className="progress-bar bg-danger"
                          style={{
                            width: `${percent}%`,
                          }}
                          role="progressbar"
                        ></div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>

      <div className="container mt-5">
        <div className="card monthly-card">
          <div className="card-body">
            <h5 className="fw-bold mb-4 text-white">DAILY FITNESS TIPS</h5>

            <div className="row text-center g-4">
              <div className="col-md-3">
                <div className="tip-box red">
                  <p className="mb-0 fw-bold text-white">
                    Drink enough water daily
                  </p>
                </div>
              </div>

              <div className="col-md-3">
                <div className="tip-box green">
                  <p className="mb-0 fw-bold text-white">
                    Prioritize protein intake
                  </p>
                </div>
              </div>

              <div className="col-md-3">
                <div className="tip-box blue">
                  <p className="mb-0 fw-bold text-white">
                    Sleep at least 8 hours
                  </p>
                </div>
              </div>

              <div className="col-md-3">
                <div className="tip-box yellow">
                  <p className="mb-0 fw-bold text-white">
                    Stay consistent with training
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
