import React, { useState } from "react";
import { Link } from "react-router";
import ProductCard from "../../Components/Store/ProductCard"
import "../../Components/Store/Store.css";
const products = [
  {
    id: 1,
    name: "Weightlifting Belt",
    category: "Equipment",
    price: 79,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80",
  },
  {
    id: 2,
    name: "Whey Protein 2kg",
    category: "Supplements",
    price: 59,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600&q=80",
  },
  {
    id: 3,
    name: "Creatine Monohydrate",
    category: "Supplements",
    price: 29,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=600&q=80",
  },
  {
    id: 4,
    name: "BCAA Powder",
    category: "Supplements",
    price: 35,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
  {
    id: 5,
    name: "Resistance Bands",
    category: "Equipment",
    price: 24,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=600&q=80",
  },
  {
    id: 6,
    name: "Pre-Workout",
    category: "Supplements",
    price: 44,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=600&q=80",
  },
  {
    id: 7,
    name: "Gym Gloves",
    category: "Equipment",
    price: 19,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=600&q=80",
  },
  {
    id: 8,
    name: "Shaker Bottle",
    category: "Accessories",
    price: 15,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1544991875-5dc1b05f607d?w=600&q=80",
  },
];

const categories = ["All", "Equipment", "Supplements", "Accessories"];

function Store() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <>
 
      <div className="store-page">

        
        <div className="store-hero">
          <div className="store-hero-bg" />
          <div className="store-hero-content">
            <span className="store-hero-label">
              <i className="bi bi-bag me-1"></i> Fitness Store
            </span>
            <h1 className="store-hero-title">
              Our <span>Products</span>
            </h1>
            <nav className="store-hero-breadcrumb">
              <Link to="/">Home</Link>
              <span><i className="bi bi-chevron-right"></i></span>
              <span className="current">Store</span>
            </nav>
          </div>
        </div>

        
        <div className="store-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        
        <div className="store-grid-wrapper">
          <div className="store-grid">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Store;