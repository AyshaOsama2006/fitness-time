import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
function CTA() {
   const navigate = useNavigate();
  return (
    <section
      className="py-5 text-center text-white border-bottom"
      style={{ borderColor: "rgba(255,255,255,0.15)" }}
    >
      <div className="container" style={{ maxWidth: "700px" }}>
        <h2 className="mb-4 fw-bold fs-3">READY TO START YOUR TRANSFORMATION?</h2>
        <p className="mb-4 text-light-gray" style={{ lineHeight: "1.6" }}>
          Join Fitness Time today and get access to all our facilities,
          trainers,<br /> and AI-powered tools.
        </p>
        <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
          <button className="btn btn-danger fw-semibold px-4 py-2 rounded"
          onClick={() => navigate("/membership")}>
            
            View Membership Plans
          </button>
          <button
         className="btn px-4 py-2 rounded"
           style={{
           color: "#fff",           
           border: "2px solid #cfcfcf", 
          background: "transparent" 
              }}
    onClick={() => navigate("/nutrition")}>
              Try AI Nutrition
         </button>
        </div>
      </div>
    </section>
  );
}

export default CTA;