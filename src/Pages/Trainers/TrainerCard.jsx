import React from "react";



function TrainerCard({ trainer }) {
  return (
    <div
      className="card mb-2"
      style={{
        maxWidth: "540px",
        backgroundColor: "#0b0b0b",
        color: "#fff",
        border: "1px solid rgba(220,53,69,0.3)",
        borderRadius: "16px",
        overflow: "hidden",
     position: "relative" 
          }}
    >
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={trainer.image}
            className="img-fluid h-100"
            alt={trainer.name}
            style={{
              objectFit: "cover"
            }}
          />
        </div>

        <div className="col-md-8">
          <div className="card-body d-flex flex-column h-100">
            
        
            <h5 className="fw-bold mb-1">{trainer.name}</h5>

        
            <p className="text-danger mb-2" style={{ fontSize: "0.9rem", color: "#ff0000", 
              fontFamily: "Barlow Condensed, sans-serif" }}>
              {trainer.specialty}
            </p>


            <p
              style={{
                color: "#aaa",
                fontSize: "0.85rem",
                lineHeight: "1.5"
              }}
            >
              {trainer.description}
            </p>

        
            <div className="d-flex gap-3 my-2">
              <span
                style={{
                  fontSize: "0.8rem",
                  color: "#fff"
                }}
              >
                <strong>{trainer.experience}</strong>
                <br />
                <span style={{ color: "#888" }}>Experience</span>
              </span>

              <span
                style={{
                  fontSize: "0.8rem",
                  color: "#fff"
                }}
              >
                <strong>{trainer.clients}</strong>
                <br />
                <span style={{ color: "#888" }}>Clients</span>
              </span>
            </div>

        
            <p className="mb-1 fw-bold" style={{ fontSize: "0.85rem" }}>
              Skills
            </p>

            <div className="mb-3">
              {trainer.skills.map((skill, index) => (
                <span
                  key={index}
                  style={{
                    border: "1px solid #ff0000",
                    color: "#ff0000",
                    fontSize: "0.75rem",
                    padding: "4px 10px",
                    borderRadius: "20px",
                    marginRight: "6px",
                    display: "inline-block",
                    marginBottom: "6px"
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
<p
  style={{
    fontSize: "0.9rem",
    color: "#ccc",
    
    marginBottom: "8px",
    letterSpacing: "0.5px"
  }}
>
  {trainer.availability}
</p>
            <button
              style={{
                background: "#ff0000",
                border: "none",
                borderRadius: "5px",
                padding: "10px",
                color: "#fff",
                fontWeight: "500",
                transition: "0.3s"
              }}
              onMouseOver={(e) =>
                (e.target.style.background = "#ff0000")
              }
              onMouseOut={(e) =>
                (e.target.style.background = "#ff0000")
              }
            >
              Book Session
            </button>
            <div
            style={{
             position: "absolute",
             top: "10px",
            right: "10px",
            background: "#500404",
            color: "#fff",
            padding: "4px 10px",
            borderRadius: "5px",
            fontSize: "0.8rem",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: "5px"
          }}
           >
  ⭐ {trainer.rating}
</div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainerCard;