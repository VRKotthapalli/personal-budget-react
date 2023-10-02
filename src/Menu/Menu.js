import React from 'react';
import { Link } from "react-router-dom";

function Menu() {
  return (
    <nav 
    role='navigation'
    aria-label='Main menu'
    itemScope
    itemType='https://schema.org/SiteNavigationElement'
    >
        <div className="menu">
            <ul>
                <li><Link itemProp="url" to="/" aria-label="Redirects to HomePage">Home</Link></li>
                <li><Link itemProp="url" to="/login" aria-label="Redirects to Login Page of Personal Budget App">Login</Link></li>
                <li><Link itemProp="url" to="/about" aria-label="About Page provides information about the developers and their product info etc">About</Link></li>
            </ul>
        </div>
    </nav>
  );
}

export default Menu;
