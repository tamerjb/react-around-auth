import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
  });

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleDeleteClick = () => {
    setIsDeletePopupOpen(true);
  };
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePreviewOpen(false);
    setIsDeletePopupOpen(false);
  };

  const handleCardClick = (card) => {
    setIsImagePreviewOpen(true);
    setSelectedCard({
      name: card.name,
      link: card.link,
    });
  };
  // Close Moudal
  useEffect(() => {
    const closeMoudle = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeAllPopups();
      } else if (event.target.classList.contains("popup")) {
        event.preventDefault();
        closeAllPopups();
      }
    };
    document.addEventListener("mousedown", closeMoudle);
    document.addEventListener("keydown", closeMoudle);
    return () => {
      document.removeEventListener("mousedown", closeMoudle);
      document.removeEventListener("keydown", closeMoudle);
    };
  }, []);

  return (
    <div className="body">
      <Header />
      <Main
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onEditAvatarClick={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onDeleteClick={handleDeleteClick}
      />
      <Footer />

      <PopupWithForm
        title="Edit profile"
        name="popup-edit-profile"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        buttonText="Save"
      >
        <fieldset className="form__fieldset">
          <div className="form__input-container">
            <input
              id="name-input"
              type="text"
              name="name"
              placeholder="Name"
              className="form__input form__input_type_profile-name"
              minLength="2"
              maxLength="40"
              required
            />
            <span className="form__input-error name-input-error"></span>
          </div>
          <div className="form__input-container">
            <input
              id="title-input"
              type="text"
              name="title"
              placeholder="About me"
              className="form__input form__input_type_profile-title"
              minLength="2"
              maxLength="200"
              required
            />
            <span className="form__input-error title-input-error"></span>
          </div>
        </fieldset>
      </PopupWithForm>
      <PopupWithForm
        title="New place"
        name="popup-place"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        buttonText="Create"
      >
        <fieldset className="form__fieldset">
          <div className="form__input-container">
            <input
              id="place-title-input"
              type="text"
              name="name"
              placeholder="Title"
              className="form__input form__input_type_place-name"
              required
              minLength="1"
              maxLength="30"
            />
            <span className="form__input-error place-title-input-error"></span>
          </div>
          <div className="form__input-container">
            <input
              id="place-url-input"
              type="url"
              name="link"
              placeholder="Image link"
              className="form__input form__input_type_place-url"
              required
            />
            <span className="form__input-error place-url-input-error"></span>
          </div>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        title="Change Profile Picture"
        name="popup_type_avatar"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        buttonText="Save"
      >
        <fieldset className="form__fieldset">
          <div className="form__input-container">
            <input
              id="avatar-input"
              type="url"
              name="link"
              placeholder="Profile Image link"
              className="form__input form__input_type_avatar"
              required
            />
            <span className="form__input-error avatar-input-error"></span>
          </div>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        title="Are you sure?"
        name="popup-type-delete-card"
        buttonText="Yes"
        isOpen={isDeletePopupOpen}
        onClose={closeAllPopups}
      />

      <ImagePopup
        card={selectedCard}
        isOpen={isImagePreviewOpen}
        onClose={closeAllPopups}
      />
    </div>
  );
}

export default App;
