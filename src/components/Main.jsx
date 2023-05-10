import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ 
  onEditAvatar, 
  onEditProfile, 
  onAddPlace, 
  onCardClick, 
  cards, 
  onCardLike, 
  onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__overlay-avatar">
          <button
            className="profile__edit-avatar"
            type="button"
            onClick={onEditAvatar}
          />
          <img className="profile__avatar" src={currentUser.avatar} alt="аватар" />
        </div>
        <div className="profile__info">
          <div className="profile__data">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={onEditProfile}
            />
          </div>
          <p className="profile__text">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements">
        {cards.map((card) => {
          return (<Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />)
        })}
      </section>
    </main>
  );
}

export default Main;
