import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-bg-effects">
        <div className="hero-gradient-orb orb-1"></div>
        <div className="hero-gradient-orb orb-2"></div>
        <div className="hero-gradient-orb orb-3"></div>
        <div className="hero-grid-overlay"></div>
      </div>

      <div className="hero-container container">
        <div className="hero-content">
          <div className="hero-badge animate-float-slow">
            <span className="badge badge-new">🔥 New Collection 2026</span>
          </div>
          <h1 className="hero-title">
            Step Into
            <span className="hero-title-accent"> Greatness</span>
          </h1>
          <p className="hero-subtitle">
            Premium footwear crafted for those who demand the extraordinary.
            From track to trail, boardroom to boulevard.
          </p>
          <div className="hero-actions">
            <Link to="/shop" className="btn btn-primary btn-hero">
              Shop Collection
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link to="/shop/running" className="btn btn-secondary btn-hero">
              Explore Running
            </Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">40+</span>
              <span className="hero-stat-label">Premium Shoes</span>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <span className="hero-stat-number">15+</span>
              <span className="hero-stat-label">Top Brands</span>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <span className="hero-stat-number">4.8</span>
              <span className="hero-stat-label">Avg Rating</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-shoe-wrapper animate-float">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
              alt="Featured Shoe"
              className="hero-shoe-image"
            />
          </div>
          <div className="hero-shoe-shadow"></div>
          <div className="hero-ring ring-1"></div>
          <div className="hero-ring ring-2"></div>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <div className="scroll-line"></div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

export default Hero;
