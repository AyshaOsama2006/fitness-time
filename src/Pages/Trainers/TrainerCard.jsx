import React from "react";
import { useNavigate } from "react-router-dom";

function TrainerCard({ trainer }) {
  const navigate = useNavigate();

  if (!trainer) return null;

  const handleBooking = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must login first");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            trainerId: trainer.id,
            status: "pending",
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Booking created successfully");
      } else {
        alert(data.message || "Booking failed");
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div
      className="p-3 h-100 w-100"
      style={{
        backgroundColor: "#0b0b0b",
        border: "1px solid rgba(255,0,0,0.3)",
        borderRadius: "18px",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
        minHeight: "430px",
      }}
    >
      {/* Rating */}
      <div
        style={{
          position: "absolute",
          top: "15px",
          right: "15px",
          background: "#5b0000",
          padding: "6px 12px",
          borderRadius: "10px",
          fontWeight: "bold",
          color: "#ffd54f",
        }}
      >
        ⭐ {trainer.rating || "4.8"}
      </div>

      <div className="d-flex gap-3">
        <img
          src={trainer.image || "/images/default.jpg"}
          alt={trainer.name}
          style={{
            width: "170px",
            height: "260px",
            objectFit: "cover",
            borderRadius: "14px",
          }}
        />

        <div className="flex-grow-1">
          <h3 style={{ fontWeight: "700", marginBottom: "5px" }}>
            {trainer.name || "Trainer"}
          </h3>

          <p style={{ color: "#ff2b2b", marginBottom: "12px" }}>
            {trainer.specialty || "Fitness Coach"}
          </p>

          <p style={{ color: "#bdbdbd", fontSize: "0.9rem", lineHeight: "1.6" }}>
            {trainer.description ||
              "Professional trainer helping clients achieve fitness goals."}
          </p>

          <div className="d-flex gap-4 mt-3">
            <div>
              <h6 style={{ fontWeight: "bold" }}>
                {trainer.experience || "5+ years"}
              </h6>
              <small style={{ color: "#999" }}>Experience</small>
            </div>

            <div>
              <h6 style={{ fontWeight: "bold" }}>
                {trainer.clients || "100+ Clients"}
              </h6>
              <small style={{ color: "#999" }}>Clients</small>
            </div>
          </div>

          <div className="mt-3">
            <p style={{ marginBottom: "8px" }}>Skills</p>

            {(trainer.skills || ["Fitness", "Cardio", "Training"]).map((s, i) => (
              <span
                key={i}
                style={{
                  border: "1px solid red",
                  color: "#ff3b3b",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  marginRight: "8px",
                  marginBottom: "8px",
                  display: "inline-block",
                  fontSize: "0.75rem",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleBooking}
        className="btn btn-danger w-100 mt-3"
        style={{
          borderRadius: "10px",
          padding: "12px",
          fontWeight: "600",
          fontSize: "1rem",
        }}
      >
        Book Session
      </button>
    </div>
  );
}

export default TrainerCard;