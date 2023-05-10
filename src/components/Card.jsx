import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  // Создаём переменную, которую зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `elements__group ${
    isLiked && "elements__group_active"}`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="elements__element">
      {isOwn && <button 
        className="elements__delete"
        type="button"
        onClick={handleDeleteClick}
      />}
      <img
        className="elements__mask-group"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="elements__signature">
        <h2 className="elements__title">{card.name}</h2>
        <div className="elements__like-group">
          <button 
          className={cardLikeButtonClassName} 
          type="button"
          onClick={handleLikeClick}
          />
          <h2 className="elements__counter">{card.likes.length}</h2>
        </div>
      </div>
    </div>
  );
}

export default Card;
