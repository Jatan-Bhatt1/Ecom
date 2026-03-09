import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cartActions, wishlistActions } from '../redux-state/CartState';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.includes(product.id);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(
      cartActions.addItemToCart({
        id: product.id,
        title: product.name,
        price: product.price,
        image: product.primaryImage,
        brand: product.brand,
        selectedSize: product.sizes?.[0] || null,
        selectedColor: product.colors?.[0] || null,
      })
    );
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    dispatch(wishlistActions.toggleWishlist(product.id));
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={`star ${i < fullStars ? '' : 'empty'}`}>★</span>
      );
    }
    return stars;
  };

  return (
    <div
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Image */}
      <div className="product-card-image-wrapper">
        <img
          src={isHovered && product.hoverImg ? product.hoverImg : product.primaryImage}
          alt={product.name}
          className="product-card-image"
          loading="lazy"
        />

        {/* Badges */}
        <div className="product-card-badges">
          {product.isNew && <span className="badge badge-new">NEW</span>}
          {discount > 0 && <span className="badge badge-sale">-{discount}%</span>}
        </div>

        {/* Wishlist */}
        <button
          className={`product-card-wishlist ${isWishlisted ? 'active' : ''}`}
          onClick={handleToggleWishlist}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Quick Add */}
        <button className="product-card-quick-add" onClick={handleAddToCart}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          Add to Cart
        </button>
      </div>

      {/* Info */}
      <div className="product-card-info">
        <span className="product-card-brand">{product.brand}</span>
        <h3 className="product-card-name">{product.name}</h3>
        <div className="product-card-rating">
          <div className="star-rating">{renderStars(product.rating)}</div>
          <span className="rating-text">({product.reviews})</span>
        </div>
        <div className="product-card-price">
          <span className="price-current">${product.price}</span>
          {product.originalPrice && (
            <span className="price-original">${product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
