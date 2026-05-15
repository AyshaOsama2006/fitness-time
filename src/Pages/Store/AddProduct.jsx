import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AddProduct.css";

const emptyForm = {
  name: "",
  category: "Equipment",
  price: "",
  description: "",
  stock: ""
};

const CATEGORY_OPTIONS = ["Equipment", "Supplements", "Accessories"];

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch (err) {
    return null;
  }
};

const getRoleFromToken = (token) => {
  if (!token) return null;
  const payload = token.split(".")[1];
  if (!payload) return null;
  try {
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    const decoded = JSON.parse(atob(padded));
    return decoded?.role || null;
  } catch (err) {
    return null;
  }
};

function AddProduct() {
  const user = getStoredUser();
  const tokenRole = getRoleFromToken(localStorage.getItem("token"));
  const isAdmin = user?.role === "admin" || tokenRole === "admin";

  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageName, setImageName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    const previewUrl = URL.createObjectURL(file);
    setImageFile(file);
    setImagePreview(previewUrl);
    setImageName(file.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.price || !form.stock || !form.category) {
      setError("Please fill name, category, price, and stock.");
      return;
    }

    if (!imageFile) {
      setError("Please upload a product image.");
      return;
    }

    setLoading(true);
    try {
      const payload = new FormData();
      payload.append("name", form.name.trim());
      payload.append("category", form.category);
      payload.append("price", String(form.price));
      payload.append("description", form.description.trim());
      payload.append("stock", String(form.stock));
      payload.append("image", imageFile);

      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: payload
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create product");

      setSuccess("Product created successfully.");
      setForm(emptyForm);
      setImageFile(null);
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview("");
      setImageName("");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="add-product-page">
        <div className="access-card">
          <div className="access-icon">
            <i className="bi bi-shield-lock"></i>
          </div>
          <h2>Access restricted</h2>
          <p>Only admins can add products to the store.</p>
          <Link className="primary-btn" to="/home">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const previewPrice = form.price ? `$${Number(form.price).toFixed(2)}` : "$0.00";
  const previewStock = form.stock ? Number(form.stock) : 0;

  return (
    <div className="add-product-page">
      <section className="add-product-hero">
        <div className="add-product-hero-bg" />
        <div className="add-product-hero-content">
          <span className="admin-pill">Admin Only</span>
          <h1>
            Add <span>New Product</span>
          </h1>
          <p>Upload images, set pricing, and publish instantly.</p>
        </div>
      </section>

      <div className="add-product-shell">
        <div className="add-product-card">
          <div className="form-header">
            <h2>Product Details</h2>
            <p>Fill all the required fields to create a new product.</p>
          </div>

          {error && <div className="status-message error">{error}</div>}
          {success && <div className="status-message success">{success}</div>}

          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-group">
              <label htmlFor="name">Product Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g., Premium Lifting Belt"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                >
                  {CATEGORY_OPTIONS.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="price">Price (USD)</label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="79.00"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="stock">Stock</label>
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  placeholder="30"
                  value={form.stock}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                placeholder="Short product summary..."
                value={form.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Product Image</label>
              <div className="upload-area">
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImageChange}
                />
                <label htmlFor="image">
                  <i className="bi bi-cloud-arrow-up"></i>
                  <span>{imageName || "Upload image"}</span>
                  <small>PNG, JPG up to 10MB</small>
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button className="primary-btn" type="submit" disabled={loading}>
                {loading ? "Saving..." : "Create Product"}
              </button>
              <Link className="ghost-btn" to="/store">
                View Store
              </Link>
            </div>
          </form>
        </div>

        <aside className="preview-card">
          <div className="preview-image">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" />
            ) : (
              <div className="preview-placeholder">
                <i className="bi bi-image"></i>
                <span>Image preview</span>
              </div>
            )}
          </div>
          <div className="preview-body">
            <h3>{form.name || "Product Name"}</h3>
            <span className="preview-category">{form.category}</span>
            <p>{form.description || "Short description will appear here."}</p>
            <div className="preview-meta">
              <span>{previewPrice}</span>
              <span>{previewStock} in stock</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default AddProduct;
