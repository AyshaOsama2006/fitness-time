
import React from "react";

 function Section() {
  return (
    <section className="stats-section">

      <p className="stats-subtitle">
        Trusted by thousands of fitness enthusiasts
      </p>

      <div className="stats-container">

        <div className="stats-item">
          <h2 className="stats-number">5000+</h2>
          <p className="stats-label">Active Members</p>
        </div>

        <div className="stats-item">
          <h2 className="stats-number">98%</h2>
          <p className="stats-label">Satisfaction Rate</p>
        </div>

        <div className="stats-item">
          <h2 className="stats-number">4.9</h2>
          <p className="stats-label">Average Rating</p>
        </div>

      </div>

    </section>
  );
}
export default Section;
