import React, { useEffect, useMemo, useRef, useState } from "react";
import ProductCard from "../../Components/Store/ProductCard";
import "../../Components/Store/Store.css";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:5000";

function Store() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addingId, setAddingId] = useState(null);
  const [notice, setNotice] = useState("");
  const noticeTimer = useRef(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_BASE}/products`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to load products");

        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Failed to load products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    return () => {
      if (noticeTimer.current) {
        clearTimeout(noticeTimer.current);
      }
    };
  }, []);

  const normalizedProducts = useMemo(() => {
    return products.map((product) => {
      const imageUrl = product.image
        ? product.image.startsWith("http")
          ? product.image
          : `${API_BASE}${product.image}`
        : "";

      return {
        ...product,
        image: imageUrl,
        category: product.category || "General"
      };
    });
  }, [products]);

  const categories = useMemo(() => {
    const unique = new Set(
      normalizedProducts
        .map((product) => product.category)
        .filter((category) => category && category !== "General")
    );

    return ["All", ...Array.from(unique)];
  }, [normalizedProducts]);

  const filtered =
    activeCategory === "All"
      ? normalizedProducts
      : normalizedProducts.filter((p) => p.category === activeCategory);

  const navigate = useNavigate();

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add items to cart.");
      navigate("/login");
      return;
    }

    setAddingId(productId);
    try {
      const res = await fetch(`${API_BASE}/carts/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ productId, quantity: 1 })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add to cart");

      setNotice("Product added to cart.");
      if (noticeTimer.current) {
        clearTimeout(noticeTimer.current);
      }
      noticeTimer.current = setTimeout(() => {
        setNotice("");
      }, 2000);
      window.dispatchEvent(new Event("cart:updated"));
    } catch (err) {
      alert(err.message || "Failed to add to cart");
    } finally {
      setAddingId(null);
    }
  };
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
            <nav className="store-hero-breadcrumb"
            onClick={() => navigate("/home")}>
              HOME
              <span><i className="bi bi-chevron-right"></i></span>
              <span className="current">Store</span>
            </nav>
          </div>
        </div>

        
        {categories.length > 1 && (
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
        )}

        {notice && <div className="store-alert">{notice}</div>}

        
        <div className="store-grid-wrapper">
          <div className="store-grid">
            {loading && <p className="text-center text-secondary">Loading products...</p>}
            {!loading && error && (
              <p className="text-center text-danger">{error}</p>
            )}
            {!loading && !error && filtered.length === 0 && (
              <p className="text-center text-secondary">No products found.</p>
            )}
            {!loading && !error &&
              filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  isAdding={addingId === product.id}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Store;