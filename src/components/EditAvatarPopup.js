import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__field popup__field_tipe_avatar"
        id="avatar"
        name="avatar"
        type="url"
        placeholder="Введите ссылку на фото"
        required
        ref={avatarRef}
      />
      <span id="avatar-error" className="popup__field-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
