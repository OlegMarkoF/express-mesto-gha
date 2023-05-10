import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeletePopup({ isOpen, onClose, onCardDelete }) {

  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete();
  }

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      buttonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}

export default DeletePopup;
