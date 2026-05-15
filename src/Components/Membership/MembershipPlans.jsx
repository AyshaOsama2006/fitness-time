import React from "react";
import PlanCard from "./PlanCard";
import '../../Pages/Membership/Membership.css';

function MembershipPlans() {

  const plans = [
     {
      id: 1,
      title: "MONTHLY",
      price: "$49",
      period: "/month",
      image: "src/assets/images/3.jpg",
      features: [
        { text: "Full gym access", available: true },
        { text: "Locker room access", available: true },
        { text: "AI Nutrition tools", available: true },
        { text: "Group classes", available: true },
        { text: "Personal training", available: false }
      ]
    },
    {
      id: 2,
      title: "ANNUAL",
      price: "$399",
      period: "/year",
      image: "src/assets/images/photo-2.jpg",
      highlight: true,
      features: [
        { text: "Full gym access", available: true },
        { text: "Premium locker room", available: true },
        { text: "AI Nutrition Pro", available: true },
        { text: "Unlimited group classes", available: true },
        { text: "2 PT sessions/month", available: true }
      ]
    },
    {
      id: 3,
      title: "VIP",
      price: "$149",
      period: "/month",
      image: "src/assets/images/photo-1.jpg",
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
            <h1 className="title">MEMBERSHIP PLANS</h1>
            <p className="subtitle">
              Choose the plan that fits your fitness journey
            </p>
          </div>

          <div className="cards-layout">
            {plans.map((plan, index) => (
              <PlanCard key={plan.id} {...plan} />
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}

export default MembershipPlans;