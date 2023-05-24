import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import logo from "../images/header/Vector.svg";

function Header({email, handleLogout}) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      <Routes>
          <Route
            path="/signin"
            element={<Link to="/signup" className="header__link">Регистрация</Link>}
          />
          <Route
            path="/signup"
            element={<Link to="/signin" className="header__link">Войти</Link>}
          />
          <Route
            path="/"
            element={
              <div className="header__menu">
                <Link to="/signin" className="header__link" onClick={handleLogout}>Выйти</Link>
                <p className="header__email">{email}</p>
              </div>
            }
          />
        </Routes>
    </header>
  );
}

export default Header;
