import React from 'react';
import './BrandSection.css';
import hat from '../images/hat.jpg';
import bag from '../images/bag.jpg';
import cosmetic from '../images/cosmetic.jpg';
import decoration from '../images/decoration.jpg';
import jewerly from '../images/jewerly.jpg';
import stationery from '../images/stationery.jpg';
import toys from '../images/toys.jpg';

function BrandSection() {
  return (
    <div className="brand-section">
      <img src={bag} alt="bag" />
      <img src={cosmetic} alt="cosmetic" />
      <img src={decoration} alt="decoration" />
      <img src={hat} alt="hat" />
      <img src={jewerly} alt="jewerly" />
      <img src={stationery} alt="stationery" />
      <img src={toys} alt="toys" />
    </div>
  );
}

export default BrandSection;
