import React from "react";

function PopupWithForm({ name, title, children, buttonText, isOpen, onClose, onSubmit }) {
  return (
      <section
        className={`popup popup_tipe_${name} ${isOpen && 'popup_opened'}`}
      >
        <div className="popup__container">
          <button
            className="popup__close popup__close_edit"
            type="button"
            onClick={onClose}
          ></button>
          <h2 className="popup__title">{title}</h2>
          <form
            className={`popup__content popup__content_${name}`}
            name={name}
            onSubmit ={onSubmit}
            noValidate>
            {children}
            <button
              className="popup__button-save popup__button-save_change"
              name="button_name_save"
              type="submit">
              {buttonText}
            </button>
          </form>
        </div>
      </section>
  );
}

export default PopupWithForm;
