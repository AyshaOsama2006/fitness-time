import React from "react";
import "../../Pages/Home/Home.css"; 

import service1 from "../../assets/images/1.jpg";
import service2 from "../../assets/images/2.jpg";
import service3 from "../../assets/images/3.jpg";
import service4 from "../../assets/images/4.jpg";

function Services() {
  return (
    <section className="services py-5">
      <div className="container">

        <div className="text-center mb-5 services-header">
          <div className="services-line mx-auto mb-3"></div>
          <h2 className="fw-bold mb-3">OUR SERVICES</h2>
          <p className="mx-auto" style={{ color: "#aaa", maxWidth: "600px" }}>
            Comprehensive fitness solutions designed to help you achieve your goals faster and smarter.
          </p>
        </div>

        <div className="row g-4 services-container">

          {[service1, service2, service3, service4].map((img, idx) => {
            const titles = ["PERSONAL TRAINING", "AI SMART NUTRITION", "MODERN EQUIPMENT", "FITNESS COMMUNITY"];
            const icons = ["👤", "💡", "🏋️", "👥"];
            const descriptions = [
              "One-on-one sessions with certified trainers tailored to your specific goals and fitness level.",
              "Intelligent meal planning, calorie tracking, and personalized nutrition recommendations powered by AI.",
              "State-of-the-art machines and free weights from leading brands for optimal training results.",
              "Join group classes, challenges, and events. Connect with like-minded fitness enthusiasts."
            ];
            return (
              <div key={idx} className="col-12 col-md-6 col-lg-3">
                <div className="service-card card h-100 d-flex flex-column bg-dark border-secondary text-white">
                  <img src={img} alt={titles[idx]} className="card-img-top" />
                  <div className="card-body service-content flex-grow-1 d-flex flex-column">
                    <div className="icon mb-2">{icons[idx]}</div>
                    <h3 className="card-title mb-2">{titles[idx]}</h3>
                    <p className="card-text">{descriptions[idx]}</p>
                  </div>
                </div>
              </div>
            )
          })}

        </div>
      </div>
    </section>
  );
}

export default Services;