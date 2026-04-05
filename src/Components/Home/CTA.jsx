import React from "react";
import "../../Pages/Home/Home.css"; 

function CTA() {
  return (
    <section className="cta py-5" style={{ textAlign: "center", color: "white", borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
      <div className="container cta-container">

        <h2 className="mb-4 fw-bold">READY TO START YOUR TRANSFORMATION?</h2>

        <p className="mb-4" style={{ color: "#ccc", lineHeight: "1.6" }}>
          Join Fitness Time today and get access to all our facilities,
          trainers, and AI-powered <br /> tools.
        </p>

        <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
          <button className="cta-primary btn btn-danger px-4 py-2">View Membership Plans</button>
          <button className="cta-secondary btn btn-outline-light px-4 py-2">Try AI Nutrition</button>
        </div>

      </div>
    </section>
  );
}

export default CTA;