import React from "react";

import Hero from "../../Components/Home/Hero";
import About from "../../Components/Home/About";
import Services from "../../Components/Home/Services";
import CTA from "../../Components/Home/CTA";

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <CTA />
    </>
  );
}

export default Home;