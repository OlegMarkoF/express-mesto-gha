
import React, { useState } from "react";

function Login({ handleLogin }) {
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
    handleLogin(email, password);
  };
  
    return (
      <div className="login">
        <p className="login__welcome">Вход</p>
        <form onSubmit={handleSubmit} className="login__form">
          <input 
            className="popup__field popup__field_tipe_email"
            id="email" 
            name="email" 
            type="email" 
            value={email} 
            onChange={handleChangeEmail} 
            placeholder='Email'
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
            placeholder='Пароль'
            minLength="2"
            maxLength="40"
            required
          />
          <span id="password-error" className="popup__field-error"></span>
          <div className="login__button-container">
            <button type="submit" onSubmit={handleSubmit} className="login__link">Войти</button>
          </div>
        </form>
      </div>
    );
  }
  
  export default Login;