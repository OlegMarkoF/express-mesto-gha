import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("Oleg M");
  const [about, setAbout] = React.useState("good people");

  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChange(e) {
    e.target.name === "name"
    ? setName(e.target.value)
    : setAbout(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
        name: name,
        about: about,
      });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__field popup__field_tipe_name"
        id="name"
        name="name"
        type="text"
        value={name || ""}
        placeholder="Ваше имя"
        minLength="2"
        maxLength="40"
        required
        onChange={handleChange}
      />
      <span id="name-error" className="popup__field-error"></span>
      <input
        className="popup__field popup__field_tipe_job"
        id="about"
        name="about"
        type="text"
        value={about || ""}
        placeholder="Пара слов о себе"
        minLength="2"
        maxLength="200"
        required
        onChange={handleChange}
      />
      <span id="about-error" className="popup__field-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
