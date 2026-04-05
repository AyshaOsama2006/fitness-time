import React from "react";
import TrainerCard from "./TrainerCard";
import trainers from "./trainersData";


function TrainersPage() {
  return (
    <>
      <div
        className="min-vh-100 w-100 py-5"
        style={{
          backgroundColor: "#000101",
          paddingLeft: "2rem",
          paddingRight: "2rem",
        }}
      >
        <div className="text-center mb-5">
          <h1 
            className="fw-bold" 
            style={{ 
              color: "#ff0000", 
              fontFamily: "Bebas Neue, sans-serif",
            }}
          >
            Our Trainers
          </h1>
          <p className="text-secondary fs-5">
           Meet our team of certified fitness professionals dedicated to helping you achieve your goals
          </p>
        </div>

        <div className="row justify-content-center g-0">
          {trainers.map((trainer) => (
            <div key={trainer.id} className="col-md-6 d-flex justify-content-center">
              <TrainerCard trainer={trainer} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TrainersPage;