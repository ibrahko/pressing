import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> PressingApp
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="/articles">Articles</Link>
        </li>
        <li>
          <Link to="/orders">Commandes</Link>
        </li>
        <li>
          <Link to="/register">Inscription</Link>
        </li>
        <li>
          <Link to="/login">Connexion</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
