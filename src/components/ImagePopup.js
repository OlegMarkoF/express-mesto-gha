import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <section className={`popup popup_image ${card ? "popup_opened" : ""}`}>
      <figure className="popup__figure">
        <button
          className="popup__close popup__close_image"
          type="button"
          onClick={onClose}
        ></button>
        <img className="popup__photo" src={card?.link} alt={card?.name} />
        <figcaption className="popup__signature">{card?.name}</figcaption>
      </figure>
    </section>
  );
}

export default ImagePopup;
