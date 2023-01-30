import React from "react";
import { NavLink } from "react-router-dom";
import './style.css'

function NavBar() {
  return (
    <header>
      <nav className="uk-navbar-container uk-container" uk-navbar="true">
        <div className="uk-navbar-left">
          <NavLink to="/" className="uk-navbar-item uk-logo">
            <img src="/assets/imgs/logo.svg" alt="Website Logo"/>
          </NavLink>
          <ul className="uk-navbar-nav">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/TopMovies">Top Movies</NavLink></li>
            <li><NavLink to="/TopTvShows">Top TV Shows</NavLink></li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default NavBar;