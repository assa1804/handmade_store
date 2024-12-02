import React from 'react';
import './HeroBanner.css'; // Import CSS cho HeroBanner
import bannerImage from '../images/banner.png'; // Import hình ảnh banner
import PromoSection from './PromoSection.jsx'; // Import PromoSection
import ProductGrid from './ProductGrid.jsx';
import BrandSection from './BrandSection.jsx';
import LatestNews from './LatestNews.jsx';
import NewsletterSignup from './NewsletterSignup.jsx';
import Footer from './Footer.jsx';

const Home = () => {
  return (
    <>
      {/* HeroBanner Section */}
      <div className="hero-banner" style={{ backgroundImage: `url(${bannerImage})` }}>
        <div className="banner-content">
          <h2>MADE WITH LOVE</h2>
          <h1>HANDMADE ONLINE SHOP</h1>
          <div className="banner-buttons">
            <a href="/shop" className="shop-button">
              Shop
            </a>
          </div>
        </div>
      </div>

      {/* PromoSection */}
      <PromoSection /> {/* Thêm phần PromoSection */}
      <ProductGrid />
      <BrandSection />
      <LatestNews />
      <NewsletterSignup />
      <Footer />
    </>
  );
};

export default Home;
