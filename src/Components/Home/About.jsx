
import React, { useState, useEffect } from "react";
import "../../Pages/Home/Home.css";

function About() {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    fetch("https://mocki.io/v1/c6561f08-d32f-4f61-9204-a9e5deadc68a")
      .then((res) => res.json())
      .then((data) => setAboutData(data))
      .catch((err) => console.error("Error fetching about data:", err));
  }, []);

  if (!aboutData) return <p>Loading...</p>;

  return (
    <section className="about">
      <div className="about-container">

        {/* الصور */}
        <div className="about-images">
          {aboutData.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Fitness ${index + 1}`}
              className={`img${index + 1}`}
            />
          ))}
        </div>

        {/* المحتوى */}
        <div className="about-content">
          <div className="about-line"></div>

          <h2>{aboutData.title}</h2>

          {aboutData.description.map((desc, index) => (
            <p key={index}>{desc}</p>
          ))}

          <div className="about-features">
            {aboutData.features.map((feature, index) => (
              <div className="feature" key={index}>
                <span>{feature.icon}</span>
                <div>
                  <h4>{feature.title}</h4>
                  <p>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;