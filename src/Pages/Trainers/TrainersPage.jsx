import React, { useEffect, useState } from "react";
import TrainerCard from "./TrainerCard";
import { Link } from "react-router-dom";

function TrainersPage() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  const extraData = {
    "Marcus Johnson": {
      specialty: "Strength & Conditioning",
      description: "Former competitive bodybuilder with expertise in strength training and athletic performance optimization",
      experience: "10+ years",
      clients: "250+ Clients",
      skills: ["Weight Training", "HIIT", "Athletic Performance"],
      rating: 4.9,
      availability: "Monday • 5:00 PM - 8:00 PM",
    },
    "Sophia Lee": {
      specialty: "Yoga & Flexibility",
      description: "Certified yoga instructor helping clients improve flexibility and mental wellness",
      experience: "8+ years",
      clients: "180+ Clients",
      skills: ["Yoga", "Meditation", "Stretching"],
      rating: 4.9,
      availability: "Wednesday • 6:00 PM - 9:00 PM",
    },
    "David Kim": {
      specialty: "Personal Training",
      description: "Focused on customized workout plans for all fitness levels",
      experience: "12+ years",
      clients: "300+ Clients",
      skills: ["Strength", "Cardio", "Nutrition"],
      rating: 4.7,
      availability: "Sunday • 4:00 PM - 7:00 PM",
    },
    "Emma Watson": {
      specialty: "Pilates",
      description: "Expert in Pilates for core strength and posture correction",
      experience: "9+ years",
      clients: "200+ Clients",
      skills: ["Pilates", "Core Training", "Flexibility"],
      rating: 4.8,
      availability: "Saturday • 3:00 PM - 6:00 PM",
    },
    "John Doe": {
      specialty: "HIIT & Cardio",
      description: "High-Intensity Interval Training specialist to burn fat fast",
      experience: "7+ years",
      clients: "220+ Clients",
      skills: ["HIIT", "Cardio", "Endurance"],
      rating: 4.8,
      availability: "Sunday • 5:00 PM - 8:00 PM",
    },
    "Linda Smith": {
      specialty: "Nutrition & Wellness",
      description: "Helps clients balance diet and lifestyle for optimal health",
      experience: "10+ years",
      clients: "190+ Clients",
      skills: ["Nutrition", "Wellness", "Meal Planning"],
      rating: 4.9,
      availability: "Friday • 2:00 PM - 5:00 PM",
    },
  };

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const res = await fetch("http://localhost:5000/trainers");
        const data = await res.json();
        const updatedData = data.map((trainer) => ({
          ...trainer,
          ...extraData[trainer.name],
        }));
        setTrainers(updatedData);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchTrainers();
  }, []);

  return (
    <div className="min-vh-100 py-5" style={{ backgroundColor: "#000", padding: "2rem" }}>
      <h1 className="text-center text-danger mb-3">OUR TRAINERS</h1>
      <p className="text-center mb-5" style={{ color: "#999", fontSize: "1.1rem" }}>
        Meet our professional fitness trainers
      </p>
      <div className="text-center mb-5">
        <Link to="/bookings" className="btn btn-danger">My Bookings</Link>
      </div>
      {loading ? (
        <h3 className="text-white text-center">Loading...</h3>
      ) : (
        <div className="row">
          {trainers.map((trainer) => (
            <div key={trainer.id} className="col-lg-6 mb-4 d-flex">
              <TrainerCard trainer={trainer} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TrainersPage;