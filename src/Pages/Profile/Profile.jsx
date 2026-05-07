import React, { useEffect, useState } from 'react';
import './Profile.css';

export default function Profile() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    let storedUser = null;
    let token = null;

    try {
      storedUser = JSON.parse(localStorage.getItem("user"));
      token = localStorage.getItem("token");
    } catch {
      localStorage.clear();
    }

    if (!storedUser?.id || !token) {
      window.location.href = "/login";
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/users/${storedUser.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await res.json();

        if (!res.ok) {
          if (res.status === 401) {
            localStorage.clear();
            window.location.href = "/login";
            return;
          }
          throw new Error(data.message || "Failed to load profile");
        }

        setUser(data);

      } catch (error) {
        console.error(error);
        localStorage.clear();
        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

  }, []);

  const bmi =
    user?.weight && user?.height
      ? (user.weight / ((user.height / 100) ** 2)).toFixed(1)
      : "N/A";

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  if (loading) {
    return <p className="text-white text-center mt-5">Loading...</p>;
  }

  if (!user) {
    return <p className="text-white text-center mt-5">No user data</p>;
  }

  return (
    <>
      <header className="container mt-5 position-relative">
        <h1 className="text-center fw-bold text-white">YOUR PROFILE</h1>

        <button
          onClick={handleLogout}
          className="btn btn-danger position-absolute end-0 top-0"
        >
          Logout
        </button>
      </header>

      <section className="container mt-4">

        <h3 className="text-white">{user.name}</h3>

        <p className="text-white">Age: {user.age ?? "N/A"}</p>
        <p className="text-white">Height: {user.height ?? "N/A"} cm</p>
        <p className="text-white">Weight: {user.weight ?? "N/A"} kg</p>
        <p className="text-white">BMI: {bmi}</p>
        <p className="text-white">Goal: {user.fitnessGoal ?? "N/A"}</p>

      </section>
    </>
  );
}