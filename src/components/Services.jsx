import React from "react";
import "./Home.css";

// ✅ استيراد الصور
import service1 from "../assets/images/1.jpg";
import service2 from "../assets/images/2.jpg";
import service3 from "../assets/images/3.jpg";
import service4 from "../assets/images/4.jpg";

function Services() {
  return (
    <section className="services">

      <div className="services-header">

        <div className="services-line"></div>

        <h2>OUR SERVICES</h2>

        <p>
          Comprehensive fitness solutions designed to help you achieve your goals
          faster and smarter.
        </p>

      </div>

      <div className="services-container">

        {/* CARD 1 */}
        <div className="service-card">
          <img src={service1} alt="Personal Training" />

          <div className="service-content">
            <div className="icon">👤</div>

            <h3>PERSONAL TRAINING</h3>

            <p>
              One-on-one sessions with certified trainers tailored to your
              specific goals and fitness level.
            </p>
          </div>
        </div>

        {/* CARD 2 */}
        <div className="service-card">
          <img src={service2} alt="AI Nutrition" />

          <div className="service-content">
            <div className="icon">💡</div>

            <h3>AI SMART NUTRITION</h3>

            <p>
              Intelligent meal planning, calorie tracking, and personalized
              nutrition recommendations powered by AI.
            </p>
          </div>
        </div>

        {/* CARD 3 */}
        <div className="service-card">
          <img src={service3} alt="معدات" />

          <div className="service-content">
            <div className="icon">🏋️</div>

            <h3>MODERN EQUIPMENT</h3>

            <p>
              State-of-the-art machines and free weights from leading brands
              for optimal training results.
            </p>
          </div>
        </div>

        {/* CARD 4 */}
        <div className="service-card">
          <img src={service4} alt="Community" />

          <div className="service-content">
            <div className="icon">👥</div>

            <h3>FITNESS COMMUNITY</h3>

            <p>
              Join group classes, challenges, and events. Connect with
              like-minded fitness enthusiasts.
            </p>
          </div>
        </div>

      </div>

    </section>
  );
}

export default Services;