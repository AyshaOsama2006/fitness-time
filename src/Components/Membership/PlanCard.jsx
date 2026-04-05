import React from "react";

function PlanCard({ image, title, price, period, save, features, highlight }) {

  return (

    <div className={`plan-card ${highlight ? "active" : ""}`}>

      <div className="img-wrapper">

        <img src={image} alt={title}/>

        <h3 className="plan-title">
          {title}
        </h3>

      </div>

      <div className="card-body">

        <div className="price">
          {price}
          <span className="period">{period}</span>
        </div>

        {save && <p className="save-text">{save}</p>}

        <ul className="features">

          {features.map((f, index) => (

            <li key={index} className={!f.available ? "disabled" : ""}>

              <span className={f.available ? "check" : "cross"}>
                {f.available ? "✔" : "✖"}
              </span>

              {f.text}

            </li>

          ))}

        </ul>

        <button className="btn-plan">
          CHOOSE PLAN
        </button>

      </div>

    </div>

  );

  
}

export default PlanCard;