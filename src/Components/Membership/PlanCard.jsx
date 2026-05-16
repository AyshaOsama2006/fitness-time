import React, { useState } from "react";
import axios from "axios";
import "../../Pages/Membership/Membership.css";

function PlanCard({
  image,
  title,
  price,
  period,
  save,
  features,
  highlight,
  id
}) {

  const handleChoose = async () => {

    console.log("BUTTON CLICKED");

    try {

      console.log("SENDING REQUEST");
let statusValue = "active";
let endDate = "";

if (title === "MONTHLY") {
  endDate = "2026-06-14";
}

else if (title === "ANNUAL") {
  endDate = "2027-05-14";
}

else if (title === "VIP") {
  endDate = "2026-06-14";
  statusValue = "vip-active";
}
      const res = await axios.post(
        "http://localhost:5000/api/subscriptions",
        {
          userId: 1,
          membershipId: id,
           start_date: "2026-05-14",
    end_date: endDate,
    status: statusValue
  }
        
      );

      console.log("SUCCESS:", res.data);
setSubscriptionId(res.data.id);
console.log("NEW SUB ID:", res.data.id);
      alert("Subscribed Successfully");

    } catch (err) {

      console.log("FULL ERROR:", err);

      if (err.response) {
        console.log("SERVER ERROR:", err.response.data);
        alert(JSON.stringify(err.response.data));
      } else {
        console.log("NO RESPONSE FROM SERVER");
      }

      alert(" Error");
    }
  };
const [subscriptionId, setSubscriptionId] = useState(null);
  const handleDelete = async () => {

  console.log("DELETE BUTTON CLICKED");

  try {

    console.log("SENDING DELETE REQUEST");

    const res = await axios.delete(
      `http://localhost:5000/api/subscriptions/${subscriptionId}`
    );

    console.log("DELETE SUCCESS:", res.data);

    alert("Subscription Deleted");

  } catch (err) {

    console.log("FULL DELETE ERROR:", err);

    if (err.response) {

      console.log("SERVER ERROR:", err.response.data);

      alert(JSON.stringify(err.response.data));

    } else {

      console.log("NO RESPONSE FROM SERVER");

      alert("Delete Error");
    }
  }
};
  return (
    <div className={`plan-card ${highlight ? "active" : ""}`}>

      <div className="img-wrapper">
        <img src={image} alt={title} />
        <h3 className="plan-title">{title}</h3>
      </div>

      <div className="card-body">

        <div className="price">
          {price}
          <span className="period">{period}</span>
        </div>

        {save && <p className="save-text">{save}</p>}

        <ul className="features">
          {features.map((f, index) => (
            <li
              key={index}
              className={!f.available ? "disabled" : ""}
            >
              <span className={f.available ? "check" : "cross"}>
                {f.available ? "✔" : "✖"}
              </span>

              {f.text}
            </li>
          ))}
        </ul>

        <button className="btn-plan" onClick={handleChoose}>
          CHOOSE PLAN
        </button>
      <button
  className="btn-delete"
  onClick={handleDelete}
>
  DELETE SUBSCRIPTION
</button>

      </div>
    </div>
  );
}

export default PlanCard;