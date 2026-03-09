import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryShowcase.css';

const categories = [
  {
    name: 'Running',
    path: '/shop/running',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
    count: 10,
    gradient: 'linear-gradient(135deg, #e94560, #ff6b81)',
  },
  {
    name: 'Casual',
    path: '/shop/casual',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80',
    count: 9,
    gradient: 'linear-gradient(135deg, #6c63ff, #a78bfa)',
  },
  {
    name: 'Formal',
    path: '/shop/formal',
    image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&q=80',
    count: 6,
    gradient: 'linear-gradient(135deg, #0f3460, #16213e)',
  },
  {
    name: 'Sports',
    path: '/shop/sports',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&q=80',
    count: 7,
    gradient: 'linear-gradient(135deg, #00c853, #00e676)',
  },
  {
    name: 'Boots',
    path: '/shop/boots',
    image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=400&q=80',
    count: 6,
    gradient: 'linear-gradient(135deg, #ff9800, #ffc107)',
  },
];

const CategoryShowcase = () => {
  return (
    <section className="categories section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Browse By Category</span>
          <h2 className="section-title">Find Your Perfect Pair</h2>
          <p className="section-subtitle">From track to trail, office to night out — we've got every step covered.</p>
        </div>

        <div className="categories-grid">
          {categories.map((cat, index) => (
            <Link to={cat.path} key={cat.name} className="category-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="category-card-bg" style={{ background: cat.gradient }}></div>
              <img src={cat.image} alt={cat.name} className="category-card-img" />
              <div className="category-card-content">
                <h3 className="category-card-name">{cat.name}</h3>
                <span className="category-card-count">{cat.count} Products</span>
                <span className="category-card-arrow">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
