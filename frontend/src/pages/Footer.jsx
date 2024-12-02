import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      {/* Logo và thông tin liên hệ */}
      <div className="footer-logo">
        <div>HANDMADE</div>
        <span>ONLINE SHOP</span>
        <div className="contact-info">
          <p>123 cong hoa ...</p>
          <p>Tel: (+300) 125-1355</p>
          <p>Email: handmadeshop24@gmail.com</p>
        </div>
      </div>

      {/* Các cột thông tin */}
      <div className="footer-links">
        <div>
          <h4>My Account</h4>
          <ul>
            <li><a href="#">My Orders</a></li>
            <li><a href="#">My Credit Slips</a></li>
            <li><a href="#">My Addresses</a></li>
            <li><a href="#">My Personal Info</a></li>
            <li><a href="#">Payment Options</a></li>
          </ul>
        </div>
        <div>
          <h4>About Us</h4>
          <ul>
            <li><a href="#">Customer Service</a></li>
            <li><a href="#">Site Map</a></li>
            <li><a href="#">Search Terms</a></li>
            <li><a href="#">Advanced Search</a></li>
            <li><a href="#">Orders and Returns</a></li>
          </ul>
        </div>
        <div>
          <h4>Service</h4>
          <ul>
            <li><a href="#">Help</a></li>
            <li><a href="#">Gift Cards</a></li>
            <li><a href="#">Order Status</a></li>
            <li><a href="#">Free Shipping</a></li>
            <li><a href="#">International</a></li>
          </ul>
        </div>
      </div>

      {/* Tags */}
      <div className="tags">
        <h4>Tags</h4>
        <div className="tag-list">
          <span>Fashion</span>
          <span>Gift</span>
          <span>Card</span>
          <span>Winter</span>
          <span>Lovely Sweet Gift</span>
          <span>Pendant</span>
          <span>Sale</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
