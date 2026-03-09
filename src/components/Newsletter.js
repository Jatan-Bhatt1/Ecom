import React, { useState } from 'react';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <section className="newsletter section">
      <div className="container">
        <div className="newsletter-card">
          <div className="newsletter-bg-effects">
            <div className="newsletter-orb orb-a"></div>
            <div className="newsletter-orb orb-b"></div>
          </div>
          <div className="newsletter-content">
            <span className="section-label">Stay In The Loop</span>
            <h2 className="newsletter-title">Get 15% Off Your First Order</h2>
            <p className="newsletter-text">Subscribe for exclusive drops, early access, and style guides delivered to your inbox.</p>
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="newsletter-input"
                required
              />
              <button type="submit" className="btn btn-primary newsletter-btn">
                {isSubmitted ? '✓ Subscribed!' : 'Subscribe'}
              </button>
            </form>
            <p className="newsletter-disclaimer">No spam ever. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
