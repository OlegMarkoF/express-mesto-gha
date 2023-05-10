import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__field popup__field_tipe_name"
        id="place"
        name="name"
        type="text"
        value={name || ""}
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        onChange={handleNameChange}
      />
      <span id="place-error" className="popup__field-error"></span>
      <input
        className="popup__field popup__field_tipe_job"
        id="link"
        name="link"
        type="url"
        value={link || ""}
        placeholder="Ссылка на картинку"
        required
        onChange={handleLinkChange}
      />
      <span id="link-error" className="popup__field-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
