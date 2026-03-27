import React, { useState, useEffect } from "react";
import "../../Pages/Home/Home.css";

function Services() {
  const [servicesData, setServicesData] = useState(null);

  useEffect(() => {
    fetch("https://mocki.io/v1/6549d3e2-5099-4685-95aa-53cfcb17f03e")
      .then(res => res.json())
      .then(data => setServicesData(data))
      .catch(err => console.error("Error:", err));
  }, []);

  if (!servicesData) return <p>Loading...</p>;

  return (
    <section className="services">

      {/* الهيدر */}
      <div className="services-header">
        <div className="services-line"></div>
        <h2>{servicesData.title}</h2>
        <p>{servicesData.description}</p>
      </div>

      {/* الكروت */}
      <div className="services-container">
        {servicesData.services.map((service, index) => (
          <div className="service-card" key={index}>
            <img src={service.image} alt={service.alt} />

            <div className="service-content">
              <div className="icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}

export default Services;