import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { store } from '../productsStore/Store';
import './NavBar.css';

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const navigate = useNavigate();

    const handleSearch = (value) => {
        setSearchQuery(value);
        if (value.trim().length > 0) {
            const results = store.filter(
                (p) =>
                    p.name.toLowerCase().includes(value.toLowerCase()) ||
                    p.brand?.toLowerCase().includes(value.toLowerCase()) ||
                    p.category?.toLowerCase().includes(value.toLowerCase())
            ).slice(0, 5);
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    const handleSearchSelect = (id) => {
        setSearchQuery('');
        setSearchResults([]);
        setIsSearchOpen(false);
        navigate(`/product/${id}`);
    };

    const categories = [
        { name: 'Running', path: '/shop/running' },
        { name: 'Casual', path: '/shop/casual' },
        { name: 'Formal', path: '/shop/formal' },
        { name: 'Sports', path: '/shop/sports' },
        { name: 'Boots', path: '/shop/boots' },
    ];

    return (
        <nav className="navbar glass">
            <div className="navbar-container container">
                {/* Logo */}
                <Link to="/" className="navbar-logo">
                    <span className="logo-icon">👟</span>
                    <span className="logo-text">SOLE<span className="logo-accent">STUDIO</span></span>
                </Link>

                {/* Desktop Nav Links */}
                <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
                    <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link to="/shop" className="nav-link" onClick={() => setIsMenuOpen(false)}>Shop All</Link>
                    {categories.map((cat) => (
                        <Link key={cat.name} to={cat.path} className="nav-link" onClick={() => setIsMenuOpen(false)}>
                            {cat.name}
                        </Link>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="navbar-actions">
                    {/* Search */}
                    <div className={`search-wrapper ${isSearchOpen ? 'active' : ''}`}>
                        <input
                            type="text"
                            placeholder="Search shoes..."
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="search-input"
                        />
                        {searchResults.length > 0 && (
                            <div className="search-dropdown glass">
                                {searchResults.map((item) => (
                                    <div key={item.id} className="search-item" onClick={() => handleSearchSelect(item.id)}>
                                        <img src={item.primaryImage} alt={item.name} className="search-item-img" />
                                        <div className="search-item-info">
                                            <span className="search-item-brand">{item.brand}</span>
                                            <span className="search-item-name">{item.name}</span>
                                            <span className="search-item-price">${item.price}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <button className="btn-icon nav-btn" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </button>

                    {/* Wishlist */}
                    <Link to="/shop" className="btn-icon nav-btn" style={{ position: 'relative' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        {wishlistItems.length > 0 && <span className="badge-count">{wishlistItems.length}</span>}
                    </Link>

                    {/* Cart */}
                    <Link to="/cart" className="btn-icon nav-btn" style={{ position: 'relative' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                        {totalQuantity > 0 && <span className="badge-count">{totalQuantity}</span>}
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <span></span><span></span><span></span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
