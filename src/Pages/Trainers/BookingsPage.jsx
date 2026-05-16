
import React, { useEffect, useState } from "react";

function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://fitness-time-backend-production.up.railway.app/bookings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        setBookings(data);
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  const deleteBooking = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://fitness-time-backend-production.up.railway.app/bookings/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        setBookings((prev) =>
          prev.filter((b) => b.id !== id)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        backgroundColor: "#000",
        padding: "2rem",
      }}
    >
      <h1 className="text-center text-danger mb-5">
        My Bookings
      </h1>

      {loading ? (
        <h3 className="text-white text-center">
          Loading...
        </h3>
      ) : bookings.length === 0 ? (
        <h3 className="text-white text-center">
          No bookings found
        </h3>
      ) : (
        <div className="row">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="col-md-6 col-lg-4 mb-4"
            >
              <div
                style={{
                  backgroundColor: "#0b0b0b",
                  border:
                    "1px solid rgba(255,0,0,0.3)",
                  borderRadius: "18px",
                  color: "#fff",
                  padding: "20px",
                }}
              >
                
                <img
                  src={
                    b.trainer?.image ||
                    "/images/default.jpg"
                  }
                  alt={b.trainer?.name}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "contain",
                    borderRadius: "14px",
                    marginBottom: "15px",
                  }}
                />

                {/* Trainer Name */}
                <h3
                  style={{
                    fontWeight: "700",
                    marginBottom: "10px",
                  }}
                >
                  {b.trainer?.name}
                </h3>

              
                <p
                  style={{
                    color:
                      b.status === "pending"
                        ? "#ffd54f"
                        : "#4caf50",
                    fontWeight: "bold",
                    marginBottom: "20px",
                  }}
                >
                  📌 {b.status}
                </p>

                {/* Delete Button */}
                <button
                  onClick={() =>
                    deleteBooking(b.id)
                  }
                  className="btn btn-danger w-100"
                  style={{
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookingsPage;

