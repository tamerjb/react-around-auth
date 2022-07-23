import React, { useState } from "react";

const Main = () => {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [IsEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [IsAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  return (
    <main className="content">
      <section className="profile">
        <div
          onClick={handleEditAvatarClick}
          className="profile__image-container"
        >
          <img src="#" alt=" Profile Picture" className="profile__image" />
        </div>
        <div className="profile__info">
          <div className="profile__person">
            <h1 className="profile__name"></h1>
            <button
              onClick={handleEditProfileClick}
              className="profile__edit-button"
              type="button"
            />
          </div>
          <p className="profile__title"></p>
        </div>
        <button
          onClick={handleAddPlaceClick}
          className="profile__add-button"
          type="button"
        />
      </section>
      <section className="cards">
        <ul className="cards__list"></ul>
      </section>
    </main>
  );
};

export default Main;
