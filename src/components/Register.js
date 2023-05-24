import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ handleRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(email, password);
  };

  return (
    <div className="register">
      <p className="register__welcome">Регистрация</p>
      <form onSubmit={handleSubmit} className="register__form">
        <input
          className="popup__field popup__field_tipe_email"
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={handleChangeEmail}
          placeholder="Email"
          required
        />
        <span id="email-error" className="popup__field-error"></span>
        <input
          className="popup__field popup__field_tipe_password"
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={handleChangePassword}
          placeholder="Пароль"
          required
        />
        <span id="password-error" className="popup__field-error"></span>
        <div className="register__button-container">
          <button
            type="submit"
            onSubmit={handleSubmit}
            className="register__link"
          >
            Зарегистрироваться
          </button>
        </div>
      </form>
      <div className="register__signin">
        <p className="register__login-text">Уже зарегистрированы?</p>
        <Link to="/signin" className="register__login-link">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
