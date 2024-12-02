import React from 'react';
import './PromoSection.css';
import light from '../images/đèn 2.webp';
import dreamcatcher from '../images/dream 1.webp';
import Jewelry from '../images/vòng 2.webp';
import hat from '../images/mũ len 2.webp';

function PromoSection() {
  return (
    <section className="promotion-grid">
      <div className="promotion-item item-1">
        <div className="promo-content">
          <h3>HOT DEALS</h3>
          <p>Home Decoration</p>
          <button>SHOP NOW</button>
        </div>
        <img src={light} alt="Hot Deals" className="promo-image" />
      </div>
      <div className="promotion-item item-2">
        <div className="promo-content">
          <h3>ON SALE</h3>
          <p>Dreamcatcher</p>
          <button>SHOP NOW</button>
        </div>
        <img src={dreamcatcher} alt="On Sale" className="promo-image" />
      </div>
      <div className="promotion-item item-3">
        <div className="promo-content">
          <h3>UP TO <span>60% OFF</span></h3>
          <p>Tote Bags</p>
        </div>
      </div>
      <div className="promotion-item item-4">
        <div className="promo-content">
          <h3>UP TO <span>45% OFF</span></h3>
          <p>Beauty & Health</p>
        </div>
      </div>
      <div className="promotion-item item-5">
        <div className="promo-content">
          <h3>EXTRA -10%</h3>
          <p>Jewelry</p>
          <button>SHOP NOW</button>
        </div>
        <img src={Jewelry} alt="Extra Discount" className="promo-image" />
      </div>
      <div className="promotion-item item-6">
        <div className="promo-content">
          <h3>-45% OFF</h3>
          <p>Fashion</p>
          <button>SHOP NOW</button>
        </div>
        <img src={hat} alt="Discounted Fashion" className="promo-image" />
      </div>
    </section>
  );
}

export default PromoSection;


