import React, { useRef } from 'react';
import ProductCard from './ProductCard';
import { store } from '../productsStore/Store';
import './BestSellersSection.css';

const BestSellersSection = () => {
  const scrollRef = useRef(null);
  const bestSellers = store.filter((p) => p.isBestSeller);

  const scroll = (dir) => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: dir === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="best-sellers section">
      <div className="container">
        <div className="best-sellers-header">
          <div>
            <span className="section-label">Most Popular</span>
            <h2 className="section-title">Best Sellers</h2>
          </div>
          <div className="best-sellers-nav">
            <button className="scroll-btn" onClick={() => scroll('left')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button className="scroll-btn" onClick={() => scroll('right')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="best-sellers-scroll" ref={scrollRef}>
          {bestSellers.map((product) => (
            <div key={product.id} className="best-sellers-item">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellersSection;
