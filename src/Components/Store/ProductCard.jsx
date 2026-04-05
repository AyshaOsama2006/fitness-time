import React from "react";

function ProductCard({ product }) {


  return (
    <div className="product-card">
      
      <div className="product-img-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        <div className="rating-badge">
          <i className="bi bi-star-fill"></i>
          {product.rating}
        </div>
      </div>

      
      <div className="product-body">
        <div className="product-name">{product.name}</div>
        <span className="product-category">{product.category}</span>
        <div className="product-price">${product.price}</div>
        <button
          className={"btn-cart"}
        >
            Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;