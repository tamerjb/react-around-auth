import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePopup from "./DeletePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
function App() {
  //set States
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
  });
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  // loading button Text
  const [isLoading, setIsLoading] = useState(false);

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePreviewOpen(false);
    setIsDeletePopupOpen(false);
  };

  //Evenet Handlers

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleDeleteClick = (card) => {
    setIsDeletePopupOpen(true);
    setSelectedCard(card);
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
        const newCards = cards.filter(
          (currentCard) => currentCard._id !== selectedCard._id
        );
        setCards(newCards);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  }
  function handleUpdateAvatar(url) {
    setIsLoading(true);
    api
      .setUserAvatar(url)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  }
  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api
      .createCard(card)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  }

  //Api Calls
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
        setCurrentUser(user);
      })
      .catch(console.log);
  }, []);
  const handleUpdateUser = ({ name, about }) => {
    setIsLoading(true);
    api
      .setUserInfo({ name, about })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  };

  //Escape key close Modual
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  //Overlay  close Modual
  useEffect(() => {
    const handleMouseDown = (event) => {
      if (event.target.classList.contains("popup")) {
        closeAllPopups();
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
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
          onCardLike={handleCardLike}
          cards={cards}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isLoading={isLoading}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <DeletePopup
          isLoading={isLoading}
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmitDelete={handleCardDelete}
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
