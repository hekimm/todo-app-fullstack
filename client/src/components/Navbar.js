import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ username, logout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Todo App
        </Link>
        {username && (
          <div className="ml-auto d-flex align-items-center">
            <span className="text-white mr-3">Merhaba, {username}</span>
            <button className="btn btn-outline-light btn-sm" onClick={logout}>
              Çıkış
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
