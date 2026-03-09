import React from 'react';
import ProductCard from './ProductCard';
import { store } from '../productsStore/Store';
import './NewArrivals.css';

const NewArrivals = () => {
  const newArrivals = store.filter((p) => p.isNew).slice(0, 8);

  return (
    <section className="new-arrivals section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Just Dropped</span>
          <h2 className="section-title">New Arrivals</h2>
          <p className="section-subtitle">Be the first to rock the freshest styles. Just in and already turning heads.</p>
        </div>

        <div className="new-arrivals-grid">
          {newArrivals.map((product, index) => (
            <div key={product.id} className="new-arrival-item" style={{ animationDelay: `${index * 0.08}s` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
