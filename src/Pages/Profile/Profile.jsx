// src/components/Profile.jsx
import React, { useState, useEffect } from "react";
import "./Profile.css";

const API_BASE = "http://localhost:5000"; // عدّل إذا عندك .env

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [nutrition, setNutrition] = useState(null); // لاحقاً من CalorieAnalysis
  const [progress, setProgress] = useState(null);    // لاحقاً من Workout/Progress table
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
        
        // 🔹 1. جلب بيانات البروفايل الأساسية
        const res = await fetch(`${API_BASE}/users/${user.id}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
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

        // 🔹 2. حساب قيم مشتقة (مؤقتاً حتى نضيفها في الباك إند)
        const bmi = userData.height && userData.weight 
          ? (userData.weight / Math.pow(userData.height / 100, 2)).toFixed(1)
          : null;

        // 🔹 3. محاكاة بيانات النيوترشن والبروجرس (لاحقاً نطلبها من API)
        setNutrition({
          calories: { current: 1850, target: 2500 },
          protein: { current: 120, target: 180 },
          carbs: { current: 200, target: 300 },
          fat: { current: 55, target: 80 }
        });

        setProgress({
          workouts: 24,
          streak: 12,
          totalTime: "45h",
          caloriesBurned: "52K",
          weightChange: "-2 kg this month",
          bodyFat: 18,
          bodyFatChange: "-1.5% this month"
        });

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

  // 🔄 Loading State
  if (loading) {
    return (
      <div className="container mt-5 text-center text-white">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // ❌ Error State
  if (error) {
    return (
      <div className="container mt-5 text-center text-danger">
        <h4>Error: {error}</h4>
        <button className="btn btn-outline-light mt-3" onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  // ✅ Render Profile
  const bmi = profile.height && profile.weight 
    ? (profile.weight / Math.pow(profile.height / 100, 2)).toFixed(1)
    : "N/A";

  return (
    <>
      <header className="container mt-5">
        <h1 className="text-center fw-bold text-white">YOUR PROFILE</h1>
        <p className="text-center text-white mb-5 fs-4 subtitle">
          Track your progress and manage your fitness journey
        </p>
      </header>

      <section className="container mt-4">
        <div className="row g-4">

          {/* LEFT CARD - User Info */}
          <div className="col-lg-4 col-md-12">
            <div className="card profile-card mb-4">
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
                  {profile.fitnessGoal ? `${profile.fitnessGoal} Plan` : "Member"}
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
                    <span className="value">{profile.height ? `${profile.height} cm` : "-"}</span>
                  </div>
                </li>
                <li className="list-group-item profile-item">
                  <div className="d-flex justify-content-between">
                    <span className="label">Weight</span>
                    <span className="value">{profile.weight ? `${profile.weight} kg` : "-"}</span>
                  </div>
                </li>
                <li className="list-group-item profile-item">
                  <div className="d-flex justify-content-between">
                    <span className="label">Goal</span>
                    <span className="goal-text">{profile.fitnessGoal || "-"}</span>
                  </div>
                </li>
                <li className="list-group-item profile-item">
                  <div className="d-flex justify-content-between">
                    <span className="label">Member Since</span>
                    <span className="value">
                      {profile.createdAt 
                        ? new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) 
                        : "-"}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT SIDE - Body Stats & Nutrition */}
          <div className="col-lg-8 col-md-12">
            
            {/* BODY STATISTICS */}
            <div className="card section-card p-4 mb-4">
              <h4 className="section-title">BODY STATISTICS</h4>
              <div className="row g-4">
                <div className="col-md-4">
                  <div className="stat-box">
                    <p className="stat-label">Current Weight</p>
                    <h2 className="stat-number">{profile.weight || "-"}kg</h2>
                    <p className="success-text">{progress?.weightChange || "-"}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="stat-box">
                    <p className="stat-label">BMI</p>
                    <h2 className="stat-number">{bmi}</h2>
                    <p className="success-text">
                      {bmi !== "N/A" ? (bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : "Overweight") : "-"}
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="stat-box">
                    <p className="stat-label">Body Fat</p>
                    <h2 className="stat-number">{progress?.bodyFat || "-"}%</h2>
                    <p className="success-text">{progress?.bodyFatChange || "-"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* NUTRITION TARGETS */}
            <div className="card section-card p-4">
              <h4 className="section-title">DAILY NUTRITION TARGETS</h4>
              
              {nutrition && ["calories", "protein", "carbs", "fat"].map((key) => {
                const item = nutrition[key];
                const percent = item.target ? Math.min((item.current / item.target) * 100, 100) : 0;
                const labels = {
                  calories: { name: "Calories", unit: "kcal" },
                  protein: { name: "Protein", unit: "g" },
                  carbs: { name: "Carbohydrates", unit: "g" },
                  fat: { name: "Fat", unit: "g" }
                };
                return (
                  <div className="mb-4" key={key}>
                    <div className="d-flex justify-content-between text-white mb-2">
                      <span className="stat-label">{labels[key].name}</span>
                      <span className="fw-bold">
                        {item.current} / {item.target} {labels[key].unit}
                      </span>
                    </div>
                    <div className="progress custom-progress">
                      <div 
                        className="progress-bar bg-danger" 
                        style={{ width: `${percent}%` }}
                        role="progressbar"
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* MONTHLY PROGRESS */}
        <div className="container mt-5">
          <div className="card monthly-card">
            <div className="card-body">
              <h5 className="fw-bold mb-4 text-white">MONTHLY PROGRESS</h5>
              <div className="row text-center g-4">
                <div className="col-md-3">
                  <div className="month-box red">
                    <h3 className="text-danger fw-bold">{progress?.workouts || "0"}</h3>
                    <p className="mb-0 fw-bold text-white">Workouts</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="month-box green">
                    <h3 className="text-success fw-bold">{progress?.streak || "0"}</h3>
                    <p className="mb-0 fw-bold text-white">Days Streak</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="month-box blue">
                    <h3 className="text-primary fw-bold">{progress?.totalTime || "0h"}</h3>
                    <p className="mb-0 fw-bold text-white">Total Time</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="month-box yellow">
                    <h3 className="text-warning fw-bold">{progress?.caloriesBurned || "0"}</h3>
                    <p className="mb-0 fw-bold text-white">Calories Burned</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}