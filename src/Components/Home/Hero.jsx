import React from "react";
import "../../Pages/Home/Home.css";
import bgImage from "../../assets/images/photo-1.jpg";
import { useNavigate } from "react-router-dom";
function Hero() {
   const navigate = useNavigate();
  return (
    <section
      className="hero d-flex align-items-center"
      style={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.9)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        padding: "80px 0"
      }}
    >
      <div className="container">

        <div className="row justify-content-between align-items-center">

          <div className="col-12 col-lg-7 hero-left mb-5 mb-lg-0">

            <div className="hero-line mb-3" style={{ width: "60px", height: "4px", backgroundColor: "#ff3b3b" }}></div>

            <h1 className="mb-4 fw-bold">
              TRANSFORM YOUR BODY <br />
              WITH <span style={{ color: "#ff3b3b" }}>FITNESS TIME</span>
            </h1>

            <p className="mb-4" style={{ color: "#cfcfcf", lineHeight: "1.6" }}>
              Experience the future of fitness. Cutting-edge<br />
              equipment, expert trainers, and AI-powered nutrition<br />
              guidance to help you achieve your goals.
            </p>

            <div className="d-flex flex-column flex-sm-row gap-3 mb-4 hero-buttons">
              <button className="btn btn-danger px-4 py-2"
              onClick={() => navigate("/membership")}>START YOUR JOURNEY</button>
              <button
               className="btn px-4 py-2 rounded"
               style={{
               color: "#fff",           
               border: "2px solid #cfcfcf", 
              background: "transparent" 
              }} onClick={() => navigate("/trainerspage")}
              > 
                MEET OUR TRAINERS</button>
            </div>

            <div className="d-flex flex-wrap gap-4 hero-stats">
              <div className="stat text-center">
                <h2 style={{ color: "#ff3b3b" }}>15K+</h2>
                <p style={{ color: "#aaa" }}>Active Members</p>
              </div>

              <div className="stat text-center">
                <h2 style={{ color: "#ff3b3b" }}>50+</h2>
                <p style={{ color: "#aaa" }}>Expert Trainers</p>
              </div>

              <div className="stat text-center">
                <h2 style={{ color: "#ff3b3b" }}>100+</h2>
                <p style={{ color: "#aaa" }}>Equipment Types</p>
              </div>
            </div>

          </div>

          <div className="col-12 col-lg-4">
            <div className="hero-card p-4 rounded" style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.1)"
            }}>
              <h4 className="text-danger mb-2">AI Powered</h4>
              <h2 className="mb-3">Smart Nutrition</h2>
              <p className="mb-3" style={{ color: "#ccc" }}>
                Get personalized meal plans and nutrition recommendations powered by advanced AI.
              </p>
              <ul className="list-unstyled" style={{ color: "#ddd" }}>
                <li>Personalized meal plans</li>
                <li>Macro tracking</li>
                <li>Progress analytics</li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;
