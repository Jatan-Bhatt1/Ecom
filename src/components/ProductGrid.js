import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { filterActions } from '../redux-state/CartState';
import ProductCard from './ProductCard';
import { store } from '../productsStore/Store';
import './ProductGrid.css';

const ProductGrid = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const activeCategory = category || filters.category;

  const allBrands = useMemo(() => [...new Set(store.map((p) => p.brand))].sort(), []);
  const allSizes = useMemo(() => [...new Set(store.flatMap((p) => p.sizes || []))].sort((a, b) => a - b), []);

  const filteredProducts = useMemo(() => {
    let result = [...store];

    // Category filter
    if (activeCategory && activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Brand filter
    if (filters.brands.length > 0) {
      result = result.filter((p) => filters.brands.includes(p.brand));
    }

    // Size filter
    if (filters.sizes.length > 0) {
      result = result.filter((p) => p.sizes?.some((s) => filters.sizes.includes(s)));
    }

    // Price filter
    result = result.filter((p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);

    // Search filter
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result = result.filter((p) => p.isNew).concat(result.filter((p) => !p.isNew));
        break;
      default:
        break;
    }

    return result;
  }, [activeCategory, filters]);

  const categoryDisplayName = activeCategory && activeCategory !== 'all'
    ? activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)
    : 'All';

  return (
    <section className="shop-page">
      <div className="container">
        <div className="shop-header">
          <div>
            <h1 className="shop-title">{categoryDisplayName} Shoes</h1>
            <p className="shop-count">{filteredProducts.length} products found</p>
          </div>
          <div className="shop-sort">
            <select
              value={filters.sortBy}
              onChange={(e) => dispatch(filterActions.setSortBy(e.target.value))}
              className="sort-select"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <div className="shop-layout">
          {/* Sidebar Filters */}
          <aside className="shop-sidebar">
            {/* Categories */}
            <div className="filter-group">
              <h4 className="filter-title">Categories</h4>
              {['all', 'running', 'casual', 'formal', 'sports', 'boots'].map((cat) => (
                <label key={cat} className="filter-option">
                  <input
                    type="radio"
                    name="category"
                    checked={activeCategory === cat || (!activeCategory && cat === 'all')}
                    onChange={() => dispatch(filterActions.setCategory(cat))}
                    className="filter-radio"
                  />
                  <span className="filter-label">
                    {cat === 'all' ? 'All Shoes' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </span>
                </label>
              ))}
            </div>

            {/* Brands */}
            <div className="filter-group">
              <h4 className="filter-title">Brands</h4>
              {allBrands.map((brand) => (
                <label key={brand} className="filter-option">
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={() => dispatch(filterActions.toggleBrand(brand))}
                    className="filter-checkbox"
                  />
                  <span className="filter-label">{brand}</span>
                </label>
              ))}
            </div>

            {/* Sizes */}
            <div className="filter-group">
              <h4 className="filter-title">Sizes</h4>
              <div className="size-grid">
                {allSizes.map((size) => (
                  <button
                    key={size}
                    className={`size-chip ${filters.sizes.includes(size) ? 'active' : ''}`}
                    onClick={() => dispatch(filterActions.toggleSize(size))}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="filter-group">
              <h4 className="filter-title">Price Range</h4>
              <div className="price-range-display">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="500"
                value={filters.priceRange[1]}
                onChange={(e) => dispatch(filterActions.setPriceRange([filters.priceRange[0], parseInt(e.target.value)]))}
                className="price-slider"
              />
            </div>

            {/* Reset */}
            <button className="btn btn-secondary filter-reset" onClick={() => dispatch(filterActions.resetFilters())}>
              Reset Filters
            </button>
          </aside>

          {/* Products Grid */}
          <div className="shop-products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="no-products">
                <span className="no-products-icon">🔍</span>
                <h3>No shoes found</h3>
                <p>Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
