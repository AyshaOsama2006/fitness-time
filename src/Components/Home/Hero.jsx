import React from "react";
import "../../Pages/Home/Home.css";
import bgImage from "../../assets/images/7.jpg";
function Hero() {
  return (
<section  
  className="hero"  
  style={{  
    backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${bgImage})`
  }}  
>
      <div className="hero-container">

        <div className="hero-left">

          <div className="hero-line"></div>

          <h1>
            TRANSFORM YOUR BODY <br />
            WITH <span>FITNESS TIME</span>
          </h1>

          <p>
            Experience the future of fitness. Cutting-edge<br/>
            equipment, expert trainers, and Al-powered nutrition<br/>
            guidance to help you achieve your goals.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary">START YOUR JOURNEY</button>
            <button className="btn-secondary">MEET OUR TRAINERS</button>
          </div>

          <div className="hero-stats">

            <div className="stat">
              <h2>15K+</h2>
              <p>Active Members</p>
            </div>

            <div className="stat">
              <h2>50+</h2>
              <p>Expert Trainers</p>
            </div>

            <div className="stat">
              <h2>100+</h2>
              <p>Equipment Types</p>
            </div>

          </div>

        </div>

        <div className="hero-card">

          <h4>AI Powered</h4>
          <h2>Smart Nutrition</h2>

          <p>
            Get personalized meal plans and nutrition recommendations powered by advanced AI.
          </p>

          <ul>
            <li>Personalized meal plans</li>
            <li>Macro tracking</li>
            <li>Progress analytics</li>
          </ul>

        </div>

      </div>

    </section>
  );
}


export default Hero;
