import React from "react";
import PlanCard from "./PlanCard";

function MembershipPlans() {

  const plans = [

    {
      title: "MONTHLY",
      price: "$49",
      period: "/month",
      image: "public/assets/photo-1534438327276-14e5300c3a48.jfif",
      features: [
        { text: "Full gym access", available: true },
        { text: "Locker room access", available: true },
        { text: "AI Nutrition tools", available: true },
        { text: "Group classes", available: true },
        { text: "Personal training", available: false }
      ]
    },

    {
      title: "ANNUAL",
      price: "$399",
      period: "/year",
      save: "Save $189 compared to monthly",
      highlight: true,
      image: "public/assets/photo-1571902943202-507ec2618e8f.jfif",
      features: [
        { text: "Full gym access", available: true },
        { text: "Premium locker room", available: true },
        { text: "AI Nutrition Pro", available: true },
        { text: "Unlimited group classes", available: true },
        { text: "2 PT sessions/month", available: true }
      ]
    },

    {
      title: "VIP",
      price: "$149",
      period: "/month",
      image: "public/assets/photo-1517836357463-d25dfeac3438.jfif",
      features: [
        { text: "24/7 VIP gym access", available: true },
        { text: "Private VIP lounge", available: true },
        { text: "AI Nutrition Elite", available: true },
        { text: "Unlimited PT sessions", available: true },
        { text: "Free supplements", available: true }
      ]
    }

  ];

  return (

    <section className="membership-section">

      <div className="container">

        <div className="header">

          <div className="accent-line"></div>

          <h1 className="title">
            MEMBERSHIP PLANS
          </h1>

          <p className="subtitle">
            Choose the plan that fits your fitness journey. All plans include access to our AI nutrition tools.
          </p>

        </div>

        <div className="plans-grid">

          {plans.map((plan, index) => (
            <PlanCard key={index} {...plan}/>
          ))}

        </div>

      </div>

    </section>

  );
}

export default MembershipPlans;