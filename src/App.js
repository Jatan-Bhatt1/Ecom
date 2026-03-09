import './App.css';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import CategoryShowcase from './components/CategoryShowcase';
import BestSellersSection from './components/BestSellersSection';
import NewArrivals from './components/NewArrivals';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import SinglePage from './components/SinglePage';
import Cart from './components/Cart';
import ProductGrid from './components/ProductGrid';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <>
                <Hero />
                <CategoryShowcase />
                <BestSellersSection />
                <NewArrivals />
                <Newsletter />
                <Footer />
              </>
            }
          />
          <Route path="/shop" element={<><ProductGrid /><Footer /></>} />
          <Route path="/shop/:category" element={<><ProductGrid /><Footer /></>} />
          <Route path="/product/:id" element={<SinglePage />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
