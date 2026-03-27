import React from "react";

import Navbar from "../../Components/Home/Navbar";
import Hero from "../../Components/Home/Hero";
import About from "../../Components/Home/About";
import Services from "../../Components/Home/Services";
import CTA from "../../Components/Home/CTA";
import Footer from "../../Components/Footer/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <CTA />
      <Footer />
    </>
  );
}

export default Home;