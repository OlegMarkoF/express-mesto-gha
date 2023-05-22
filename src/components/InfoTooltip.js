import React from "react";

function InfoTooltip({ isOpen, onClose, message }) {
  return (
    <section className={`popup popup_tipe_tooltip ${isOpen && "popup_opened"}`}>
      <div className="popup__container popup__container_tooltip">
        <button
          className="popup__close popup__close_edit"
          type="button"
          onClick={onClose}
        ></button>
        <form className={`popup__content popup__content_tipe_tooltip`}>
          <img
            className="popup__message-img"
            src={message.img}
            alt="картинка авторизации"
          />
          <p className="popup__message-text">{message.text}</p>
        </form>
      </div>
    </section>
  );
}

export default InfoTooltip;
