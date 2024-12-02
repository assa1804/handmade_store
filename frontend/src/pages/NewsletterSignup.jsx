import React from 'react';
import './NewsletterSignup.css';

function NewsletterSignup() {
  return (
    <div className="newsletter-signup">
      <h2>Newsletter</h2>
      <input type="email" placeholder="Your email address" />
      <button>Submit</button>
    </div>
  );
}

export default NewsletterSignup;
