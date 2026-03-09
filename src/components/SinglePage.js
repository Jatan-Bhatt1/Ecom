import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions, wishlistActions } from '../redux-state/CartState';
import ProductCard from './ProductCard';
import { store } from '../productsStore/Store';
import Footer from './Footer';
import './SinglePage.css';

const SinglePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = store.find((p) => p.id === id);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  const images = product ? [product.primaryImage, product.hoverImg].filter(Boolean) : [];
  const isWishlisted = product ? wishlistItems.includes(product.id) : false;

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return store
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="single-page-not-found">
        <div className="container">
          <h2>Product Not Found</h2>
          <p>The shoe you're looking for doesn't exist.</p>
          <Link to="/shop" className="btn btn-primary">Browse All Shoes</Link>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(
        cartActions.addItemToCart({
          id: product.id,
          title: product.name,
          price: product.price,
          image: product.primaryImage,
          brand: product.brand,
          selectedSize: selectedSize,
          selectedColor: selectedColor,
        })
      );
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
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

  const colorNames = {
    '#1a1a2e': 'Midnight',
    '#e94560': 'Crimson',
    '#f5f5f5': 'White',
    '#0f3460': 'Navy',
    '#533483': 'Purple',
    '#16213e': 'Dark Blue',
    '#3e2723': 'Brown',
  };

  return (
    <>
      <section className="single-page">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/shop">Shop</Link>
            <span>/</span>
            <Link to={`/shop/${product.category}`}>{product.category}</Link>
            <span>/</span>
            <span className="breadcrumb-current">{product.name}</span>
          </nav>

          <div className="single-page-layout">
            {/* Image Gallery */}
            <div className="sp-gallery">
              <div className="sp-main-image">
                <img src={images[activeImage]} alt={product.name} className="sp-hero-img" />
                {product.isNew && <span className="badge badge-new sp-badge">NEW</span>}
                {discount > 0 && <span className="badge badge-sale sp-badge sp-badge-sale">-{discount}%</span>}
              </div>
              <div className="sp-thumbnails">
                {images.map((img, i) => (
                  <button
                    key={i}
                    className={`sp-thumb ${i === activeImage ? 'active' : ''}`}
                    onClick={() => setActiveImage(i)}
                  >
                    <img src={img} alt={`View ${i + 1}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="sp-details">
              <span className="sp-brand">{product.brand}</span>
              <h1 className="sp-name">{product.name}</h1>

              <div className="sp-rating">
                <div className="star-rating">{renderStars(product.rating)}</div>
                <span className="rating-text">{product.rating} ({product.reviews} reviews)</span>
              </div>

              <div className="sp-price-row">
                <span className="sp-price">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="sp-original-price">${product.originalPrice}</span>
                    <span className="sp-discount">Save ${product.originalPrice - product.price}</span>
                  </>
                )}
              </div>

              <p className="sp-description">{product.description}</p>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="sp-option-group">
                  <h4 className="sp-option-title">
                    Color: <span className="sp-option-value">{selectedColor ? colorNames[selectedColor] || selectedColor : 'Select'}</span>
                  </h4>
                  <div className="sp-colors">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        className={`sp-color-btn ${selectedColor === color ? 'active' : ''}`}
                        style={{ background: color }}
                        onClick={() => setSelectedColor(color)}
                        title={colorNames[color] || color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="sp-option-group">
                  <h4 className="sp-option-title">
                    Size: <span className="sp-option-value">{selectedSize || 'Select'}</span>
                  </h4>
                  <div className="sp-sizes">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        className={`sp-size-btn ${selectedSize === size ? 'active' : ''}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        US {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="sp-option-group">
                <h4 className="sp-option-title">Quantity</h4>
                <div className="sp-quantity">
                  <button className="sp-qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                  <span className="sp-qty-value">{quantity}</span>
                  <button className="sp-qty-btn" onClick={() => setQuantity(Math.min(10, quantity + 1))}>+</button>
                </div>
              </div>

              {/* Actions */}
              <div className="sp-actions">
                <button className="btn btn-primary sp-add-btn" onClick={handleAddToCart}>
                  {addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
                  {!addedToCart && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                  )}
                </button>
                <button
                  className={`btn-icon sp-wishlist-btn ${isWishlisted ? 'active' : ''}`}
                  onClick={() => dispatch(wishlistActions.toggleWishlist(product.id))}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>

              {/* Features */}
              <div className="sp-features">
                <div className="sp-feature">
                  <span>🚚</span> Free shipping on orders over $100
                </div>
                <div className="sp-feature">
                  <span>↩️</span> 30-day free returns
                </div>
                <div className="sp-feature">
                  <span>🛡️</span> 2-year warranty included
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="sp-related">
              <h2 className="section-title">You May Also Like</h2>
              <div className="sp-related-grid">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default SinglePage;
