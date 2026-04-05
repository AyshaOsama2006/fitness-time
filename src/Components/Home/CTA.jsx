import React from "react";
import "../../Pages/Home/Home.css";function CTA() {
  return (
    <section className="cta">

      <div className="cta-container">

        <h2>READY TO START YOUR TRANSFORMATION?</h2>

        <p>
          Join Fitness Time today and get access to all our facilities,
          trainers, and AI-powered <br/>tools.
        </p>

        <div className="cta-buttons">
          <button className="cta-primary">View Membership Plans</button>
          <button className="cta-secondary">Try AI Nutrition</button>
        </div>

      </div>

    </section>
  );
}

export default CTA;