import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/assets/Cognicare.png" alt="Cognicare Logo" />
      </div>
      <ul className="navbar-menu">
        <li><Link to="/schedule">나의 일정</Link></li>
        <li><Link to="/chatbot">지킴이와 대화</Link></li>
        <li><Link to="/mypage">마이페이지</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
