import React from "react";

function ProductCard({ product, onAddToCart, isAdding }) {
  const price = Number(product.price);
  const formattedPrice = Number.isFinite(price) ? price.toFixed(2) : product.price;
  const categoryLabel = product.category || "General";
  const ratingValue = Number(product.rating);
  const showRating = Number.isFinite(ratingValue);


  return (
    <div className="product-card">
      
      <div className="product-img-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        {showRating && (
          <div className="rating-badge">
            <i className="bi bi-star-fill"></i>
            {ratingValue}
          </div>
        )}
      </div>

      
      <div className="product-body">
        <div className="product-name">{product.name}</div>
        <span className="product-category">{categoryLabel}</span>
        <div className="product-price">${formattedPrice}</div>
        <button
          className={"btn-cart"}
          type="button"
          onClick={() => onAddToCart?.(product.id)}
          disabled={isAdding}
        >
            {isAdding ? "Adding..." : "Add To Cart"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;