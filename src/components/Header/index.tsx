import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

export const Header = () => {
  return (
    <header>
      <nav>
        <Link id="title" to="/customers">
          Customer List
        </Link>
        <Link to="/about">About</Link>
      </nav>
    </header>
  );
};
