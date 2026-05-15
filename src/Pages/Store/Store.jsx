import React, { useEffect, useMemo, useRef, useState } from "react";
import ProductCard from "../../Components/Store/ProductCard";
import "../../Components/Store/Store.css";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:5000";
const PRODUCT_CATEGORIES = ["Equipment", "Supplements", "Accessories"];
const FILTER_CATEGORIES = ["All", ...PRODUCT_CATEGORIES];

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

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch (err) {
    return null;
  }
};

function Store() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addingId, setAddingId] = useState(null);
  const [notice, setNotice] = useState("");
  const noticeTimer = useRef(null);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    category: "Equipment",
    price: "",
    stock: "",
    description: "",
    image: ""
  });
  const [editImageFile, setEditImageFile] = useState(null);
  const [modalError, setModalError] = useState("");

  const storedUser = getStoredUser();
  const tokenRole = getRoleFromToken(localStorage.getItem("token"));
  const isAdmin = storedUser?.role === "admin" || tokenRole === "admin";

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

  const showNotice = (message) => {
    setNotice(message);
    if (noticeTimer.current) {
      clearTimeout(noticeTimer.current);
    }
    noticeTimer.current = setTimeout(() => {
      setNotice("");
    }, 2000);
  };

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
        category: PRODUCT_CATEGORIES.includes(product.category)
          ? product.category
          : "Equipment"
      };
    });
  }, [products]);

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

      showNotice("Product added to cart.");
      window.dispatchEvent(new Event("cart:updated"));
    } catch (err) {
      alert(err.message || "Failed to add to cart");
    } finally {
      setAddingId(null);
    }
  };

  const openEditDialog = (product) => {
    if (!isAdmin) return;
    setModalError("");
    setDeleteProduct(null);
    setEditProduct(product);
    setEditImageFile(null);
    setEditForm({
      name: product.name || "",
      category: PRODUCT_CATEGORIES.includes(product.category)
        ? product.category
        : "Equipment",
      price: product.price ?? "",
      stock: product.stock ?? "",
      description: product.description || "",
      image: product.image || ""
    });
  };

  const openDeleteDialog = (product) => {
    if (!isAdmin) return;
    setModalError("");
    setEditProduct(null);
    setDeleteProduct(product);
  };

  const closeDialogs = () => {
    setEditProduct(null);
    setDeleteProduct(null);
    setEditImageFile(null);
    setModalError("");
  };

  const handleEditChange = (e) => {
    setEditForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setEditImageFile(file);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editProduct) return;

    const token = localStorage.getItem("token");
    const imageValue = editForm.image.trim();
    const imagePath = imageValue.startsWith(API_BASE)
      ? imageValue.slice(API_BASE.length)
      : imageValue;
    const payload = new FormData();
    payload.append("name", editForm.name.trim());
    payload.append("category", editForm.category);
    payload.append("price", String(editForm.price));
    payload.append("stock", String(editForm.stock));
    payload.append("description", editForm.description.trim());
    if (editImageFile) {
      payload.append("image", editImageFile);
    } else if (imagePath) {
      payload.append("image", imagePath);
    }

    try {
      const res = await fetch(`${API_BASE}/products/${editProduct.id}`, {
        method: "PUT",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: payload
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update product");

      setProducts((prev) =>
        prev.map((item) => (item.id === editProduct.id ? data : item))
      );
      closeDialogs();
      showNotice("Product updated successfully.");
    } catch (err) {
      setModalError(err.message || "Failed to update product");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteProduct) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/products/${deleteProduct.id}`, {
        method: "DELETE",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete product");

      setProducts((prev) => prev.filter((item) => item.id !== deleteProduct.id));
      closeDialogs();
      showNotice("Product deleted successfully.");
    } catch (err) {
      setModalError(err.message || "Failed to delete product");
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

        
        <div className="store-filter-bar">
          {FILTER_CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

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
                  isAdmin={isAdmin}
                  onEdit={openEditDialog}
                  onDelete={openDeleteDialog}
                />
              ))}
          </div>
        </div>

        {(editProduct || deleteProduct) && (
          <div className="store-dialog-overlay">
            <div className="store-dialog">
              {editProduct && (
                <>
                  <div className="dialog-header">
                    <h3>Edit Product</h3>
                    <button type="button" onClick={closeDialogs}>
                      ✕
                    </button>
                  </div>
                  <form onSubmit={handleEditSubmit} className="dialog-form">
                    <label>
                      Name
                      <input
                        name="name"
                        type="text"
                        value={editForm.name}
                        onChange={handleEditChange}
                        required
                      />
                    </label>
                    <label>
                      Category
                      <select
                        name="category"
                        value={editForm.category}
                        onChange={handleEditChange}
                        required
                      >
                        {PRODUCT_CATEGORIES.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Price
                      <input
                        name="price"
                        type="number"
                        step="0.01"
                        value={editForm.price}
                        onChange={handleEditChange}
                        required
                      />
                    </label>
                    <label>
                      Stock
                      <input
                        name="stock"
                        type="number"
                        value={editForm.stock}
                        onChange={handleEditChange}
                        required
                      />
                    </label>
                    <label>
                      Description
                      <textarea
                        name="description"
                        rows="3"
                        value={editForm.description}
                        onChange={handleEditChange}
                      />
                    </label>
                    <label>
                      Replace Image (optional)
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={handleEditFileChange}
                      />
                      <span className="dialog-help">
                        {editImageFile
                          ? `Selected: ${editImageFile.name}`
                          : editForm.image
                            ? "Current image will be kept."
                            : "No image set."}
                      </span>
                    </label>
                    {modalError && <p className="dialog-error">{modalError}</p>}
                    <div className="dialog-actions">
                      <button type="button" onClick={closeDialogs}>
                        Cancel
                      </button>
                      <button type="submit" className="primary">
                        Save
                      </button>
                    </div>
                  </form>
                </>
              )}

              {deleteProduct && (
                <>
                  <div className="dialog-header">
                    <h3>Delete Product</h3>
                    <button type="button" onClick={closeDialogs}>
                      ✕
                    </button>
                  </div>
                  <p>
                    Delete <strong>{deleteProduct.name}</strong>?
                  </p>
                  {modalError && <p className="dialog-error">{modalError}</p>}
                  <div className="dialog-actions">
                    <button type="button" onClick={closeDialogs}>
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="danger"
                      onClick={handleDeleteConfirm}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Store;