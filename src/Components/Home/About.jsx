import React from "react";
import "../../Pages/Home/Home.css"; 

import img1 from "../../assets/images/photo-1.jpg";
import img2 from "../../assets/images/photo-2.jpg";
import img3 from "../../assets/images/photo-3.jpg";

function About() {
  return (
    <section className="py-5 text-white" style={{ background: "radial-gradient(circle at center, #3b0a0a, #000)" }}>
      <div className="container">

        <div className="row align-items-center">

          <div className="col-md-6 mb-4 mb-md-0">
            <div className="d-grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <img 
                src={img1} 
                alt="Gym" 
                className="w-100 rounded overflow-hidden transition" 
                style={{ gridColumn: "span 2", height: "260px", objectFit: "cover" }}
              />
              <img 
                src={img2} 
                alt="Workout" 
                className="w-100 rounded overflow-hidden transition" 
                style={{ height: "220px", objectFit: "cover" }}
              />
              <img 
                src={img3} 
                alt="Fitness" 
                className="w-100 rounded overflow-hidden transition" 
                style={{ height: "220px", objectFit: "cover" }}
              />
            </div>
          </div>

          <div className="col-md-6">

            <div className="bg-danger mb-3" style={{ width: "50px", height: "4px" }}></div>

            <h2 className="fw-bold mb-3 display-6">ABOUT FITNESS TIME</h2>

            <p className="mb-2 text-light-gray" style={{ lineHeight: "1.7" }}>
              Founded in 2015, Fitness Time has grown from a single gym to a comprehensive fitness ecosystem. 
              Our vision is to make world-class fitness accessible to everyone.
            </p>

            <p className="mb-3 text-light-gray" style={{ lineHeight: "1.7" }}>
              Our training environment is designed to inspire. With dedicated zones for strength training,
               cardio, and group classes.
            </p>

            <div className="row row-cols-1 row-cols-md-2 g-3 mt-3">
              {[
                ["24/7 Access", "Train anytime, anywhere"],
                ["Expert Trainers", "Certified professionals"],
                ["Modern Equipment", "Latest fitness tech"],
                ["AI Nutrition", "Personalized plans"]
              ].map(([title, desc], idx) => (
                <div key={idx} className="col d-flex align-items-start gap-2">
                  <span className="d-flex justify-content-center align-items-center bg-danger rounded" style={{ width: "34px", height: "34px", fontWeight: "bold" }}>✓</span>
                  <div>
                    <h4 className="mb-0" style={{ fontSize: "16px" }}>{title}</h4>
                    <p className="mb-0 text-secondary" style={{ fontSize: "14px" }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default About;