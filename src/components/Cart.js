import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartActions } from '../redux-state/CartState';
import Footer from './Footer';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const shipping = totalAmount > 100 ? 0 : 9.99;
  const tax = totalAmount * 0.08;
  const orderTotal = totalAmount + shipping + tax;

  const colorNames = {
    '#1a1a2e': 'Midnight',
    '#e94560': 'Crimson',
    '#f5f5f5': 'White',
    '#0f3460': 'Navy',
    '#533483': 'Purple',
    '#16213e': 'Dark Blue',
    '#3e2723': 'Brown',
  };

  if (cartItems.length === 0) {
    return (
      <>
        <section className="cart-empty">
          <div className="container">
            <div className="cart-empty-content">
              <span className="cart-empty-icon">🛒</span>
              <h2>Your Cart is Empty</h2>
              <p>Looks like you haven't added any shoes yet. Let's fix that!</p>
              <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <section className="cart-page">
        <div className="container">
          <h1 className="cart-title">Shopping Cart ({totalQuantity} items)</h1>

          <div className="cart-layout">
            {/* Cart Items */}
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${index}`} className="cart-item glass-card">
                  <div className="cart-item-image">
                    <img src={item.picture} alt={item.name} />
                  </div>
                  <div className="cart-item-details">
                    <div className="cart-item-header">
                      <div>
                        <span className="cart-item-brand">{item.brand}</span>
                        <h3 className="cart-item-name">{item.name}</h3>
                        <div className="cart-item-meta">
                          {item.selectedSize && <span>Size: US {item.selectedSize}</span>}
                          {item.selectedColor && <span>Color: {colorNames[item.selectedColor] || item.selectedColor}</span>}
                        </div>
                      </div>
                      <button
                        className="cart-item-remove"
                        onClick={() => dispatch(cartActions.removeEntireItem({
                          id: item.id,
                          selectedSize: item.selectedSize,
                          selectedColor: item.selectedColor,
                        }))}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                    <div className="cart-item-footer">
                      <div className="cart-item-quantity">
                        <button
                          className="qty-btn"
                          onClick={() => dispatch(cartActions.removeItemFromCart({
                            id: item.id,
                            selectedSize: item.selectedSize,
                            selectedColor: item.selectedColor,
                          }))}
                        >−</button>
                        <span className="qty-value">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => dispatch(cartActions.addItemToCart({
                            id: item.id,
                            title: item.name,
                            price: item.price,
                            image: item.picture,
                            brand: item.brand,
                            selectedSize: item.selectedSize,
                            selectedColor: item.selectedColor,
                          }))}
                        >+</button>
                      </div>
                      <span className="cart-item-total">${item.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="cart-summary">
              <div className="cart-summary-card glass-card">
                <h3 className="cart-summary-title">Order Summary</h3>
                <div className="cart-summary-row">
                  <span>Subtotal</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="cart-summary-row">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'free-shipping' : ''}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="cart-summary-row">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="cart-summary-divider"></div>
                <div className="cart-summary-row total">
                  <span>Total</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
                {shipping === 0 && (
                  <div className="cart-free-shipping-note">
                    🎉 You qualify for free shipping!
                  </div>
                )}
                <button className="btn btn-primary cart-checkout-btn">
                  Proceed to Checkout
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
                <Link to="/shop" className="cart-continue-link">
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Cart;
