import React from "react";
import "../../Pages/Home/Home.css"; 

import img1 from "../../assets/images/photo-1.jpg";
import img2 from "../../assets/images/photo-2.jpg";
import img3 from "../../assets/images/photo-3.jpg";

function About() {
  return (
    <section className="about">
      <div className="container about-container">

        <div className="about-images">
          <img src={img1} alt="Gym" className="img1" />
          <img src={img2} alt="Workout" className="img2" />
          <img src={img3} alt="Fitness" className="img3" />
        </div>

        <div className="about-content">
          <div className="about-line"></div>

          <h2>ABOUT FITNESS TIME</h2>

          <p>
            Founded in 2015, Fitness Time has grown from a single gym to a
            comprehensive fitness ecosystem. Our vision is to make world-class
            fitness accessible to everyone, combining state-of-the-art
            equipment with cutting-edge technology.
          </p> 

          <p>
            Our training environment is designed to inspire. With dedicated
            zones for strength training, cardio, functional fitness, and group
            classes, every workout becomes an experience. Our AI-powered
            nutrition assistant ensures your diet supports your fitness goals.
          </p>

          <div className="about-features">
            <div className="feature">
              <span>✓</span>
              <div>
                <h4>24/7 Access</h4>
                <p>Train anytime, anywhere</p>
              </div>
            </div>

            <div className="feature">
              <span>✓</span>
              <div>
                <h4>Expert Trainers</h4>
                <p>Certified professionals</p>
              </div>
            </div>

            <div className="feature">
              <span>✓</span>
              <div>
                <h4>Modern Equipment</h4>
                <p>Latest fitness tech</p>
              </div>
            </div>

            <div className="feature">
              <span>✓</span>
              <div>
                <h4>AI Nutrition</h4>
                <p>Personalized plans</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default About;