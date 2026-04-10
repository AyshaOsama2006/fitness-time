import React from "react";
import PlanCard from "./PlanCard";

function MembershipPlans() {

  const plans = [
    {
      title: "MONTHLY",
      price: "$49",
      period: "/month",
      image: "/images/3.jpg",
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
      image: "/images/photo-2.jpg",
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
      image: "/images/photo-1.jpg",
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
    <div className="membership-page">

      <section className="membership-section">

        <div className="membership-container">

          <div className="membership-header">
            <div className="accent-line"></div>

            <h1 className="title">
              MEMBERSHIP PLANS
            </h1>

            <p className="subtitle">
            Choose the plan that fits your fitness journey. All plans include access to our AI nutrition tools.

            </p>
          </div>

          <div className="cards-layout">
            {plans.map((plan, index) => (
              <PlanCard key={index} {...plan} />
            ))}
          </div>

        </div>

      </section>

      <section className="stats-section">

        <p className="gym-stats-title">
          Trusted by thousands of fitness enthusiasts
        </p>

        <div className="stats-container">

          <div className="gym-stat">
            <h2 className="gym-stat-number">500+</h2>
            <p className="gym-stat-text">Active Members</p>
          </div>

          <div className="gym-stat">
            <h2 className="gym-stat-number">20+</h2>
            <p className="gym-stat-text">Professional Trainers</p>
          </div>

          <div className="gym-stat">
            <h2 className="gym-stat-number">10+</h2>
            <p className="gym-stat-text">Years Experience</p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default MembershipPlans;