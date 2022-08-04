import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setisEditProfilePopupOpenPopupOpen] = useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
  });
  const [cards, setCards] = useState([]);
  const [currentUser, setIsCurrentUser] = useState("");
  //state for loading
  const [isLoading, setIsLoading] = useState(false);

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
  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    // Send a request to the API and getting the updated card data
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch(console.log);
  }
  function handleCardDelete(e) {
    e.preventDefault();
    setIsLoading(true);
    api
      .deleteCard(selectedCard._id)
      .then((res) => {
        setIsLoading(false);
        const newCards = cards.filter(
          (currentCard) => currentCard._id !== selectedCard._id
        );
        setCards(newCards);
        closeAllPopups();
      })
      .catch(console.log);
  }
  useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch(console.log);
  }, []);
  useEffect(() => {
    api
      .getUserInfo()
      .then((user) => {
        setIsCurrentUser(user);
      })
      .catch(console.log);
  }, []);
  // Close Modal
  useEffect(() => {
    const closeModal = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeAllPopups();
      } else if (event.target.classList.contains("popup")) {
        event.preventDefault();
        closeAllPopups();
      }
    };
    document.addEventListener("mousedown", closeModal);
    document.addEventListener("keydown", closeModal);
    return () => {
      document.removeEventListener("mousedown", closeModal);
      document.removeEventListener("keydown", closeModal);
    };
  }, []);

  return (
    <div className="body">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onDeleteClick={handleDeleteClick}
          cards={cards}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
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
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
