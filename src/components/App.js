import React, { useState,useEffect,useRef } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [IsEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [IsAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
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
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePreviewOpen(false);
  };

    const handleCardClick = (card) => {
    setIsImagePreviewOpen(true);
    setSelectedCard({
      name: card.name,
      link: card.link,
    });
  };
  // Close On Esacbe
  useEffect(() => {
    const keyDownHandler = event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeAllPopups();
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);
   //close on Overlay
   useEffect(() => {
    const clickOverlayHandler = event => {
      if (event.target.classList.contains("popup")) {
        event.preventDefault();
        closeAllPopups();
      }
    };
    document.addEventListener('mousedown', clickOverlayHandler);
    return () => {
      document.removeEventListener('mousedown', clickOverlayHandler);
    };
  }, []);



  return (
    <div className="body">

    <Header/>
    <Main
    onEditProfileClick ={handleEditProfileClick}
    onAddPlaceClick ={handleAddPlaceClick}
    onEditAvatarClick ={handleEditAvatarClick}
    onCardClick={handleCardClick}
    />
    <Footer/>

    {/* <div className="popup popup-edit-profile" >
        <div className="popup-edit-profile ">
            <button className="popup__close-button"  type="button"></button>
            {/* <!-- edit Profile popup -->
            <div className="popup__container">
                <h2 className="popup__title">Edit profile</h2>
                <form action="submit" className="form popup__form" name="form">
                    <fieldset className="form__fieldset">
                        <div className="form__input-container">
                            <input id="name-input" type="text" name="name" placeholder="Name" required
                                className="form__input " minLength="2" maxLength="40"/>
                            <span className="form__input-error" id="name-input-error"></span>
                        </div>
                        <div className="form__input-container">
                            <input id="subname-input" type="text" name="about" placeholder="About" required
                                className="form__input" minLength="2" maxLength="200"/>
                            <span id="subname-input-error" className="form__input-error "></span>
                        </div>
                    </fieldset>
                    <fieldset className="form__fieldset">
                        <button id="form__button" className="form__button" type="submit">Save</button>
                    </fieldset>
                </form>
            </div>
        </div>
    </div> old div  */}

    <PopupWithForm
        title="Edit profile"
        name="popup-edit-profile"
        isOpen={IsEditProfilePopupOpen}
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

    {/* <div className="popup popup-place">
        <div className="popup-place">
            <button className="popup__close-button " type="button"></button>

            <div className="popup__container">
                <h2 className="popup__title">New Place</h2>
                <form action="submit" className="form popup__form popup__form-type-add-place">
                    <fieldset className="form__fieldset">
                        <div className="form__input-container">
                            <input id="form__input-type-place-name" type="text" name="name" placeholder="Title"
                                className="form__input form__input-type-place-name" required minLength="1" maxLength="30" />
                            <span id="form__input-type-place-name-error"
                                className="form__input-error form__input-type-place-name-error"></span>
                        </div>
                        <div className="form__input-container">
                            <input type="url" name="link" placeholder="Image link"
                                className="form__input form__input-type-place-url" id="form__input-type-place-url"
                                required />
                            <span className="form__input-error " id="form__input-type-place-url-error"></span>
                        </div>


                    </fieldset>
                    <fieldset className="form__fieldset">
                        <button className="form__button" type="submit">
                            Save
                        </button>
                    </fieldset>
                </form>
            </div>
        </div>
    </div> */}
      {/* <!-- add newCard popup --> */}
          <PopupWithForm
        title="New place"
        name="popup-place"
        isOpen={IsAddPlacePopupOpen}
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


    {/* <!-- edit avatar popup --> */}
     {/*<div className="popup popup_type_avatar">
        <div>
            <button className="popup__close-button" type="button"></button>
            <div className="popup__container">
                <h2 className="popup__title">Change Profile Picture </h2>
                <form action="submit" className="form popup__form popup__form_type_avatar" noValidate autoComplete="off">
                    <fieldset className="form__fieldset">
                        <div className="form__input-container">
                            <input id="avatar-input" type="url" name="link" placeholder="Profile Image link"
                                className="form__input form__input_type_avatar" required />
                            <span className="form__input-error avatar-input-error" id="avatar-input-error"></span>
                        </div>
                    </fieldset>
                    <fieldset className="form__fieldset">
                        <button className="form__button form__button_type_avatar" type="submit">
                            Save
                        </button>
                    </fieldset>
                </form>
            </div>
        </div>
    </div> */}
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

    {/* <!-- delete card form --> */}
    {/* <div className="popup popup-type-delete-card ">
        <div>
            <button className="popup__close-button" type="button"></button>
            <div className="popup__container">
                <h2 className="popup__title">Are you sure?</h2>
                <form action="submit" className="form popup__form popup__form-type-delete-card" noValidate
                    autoComplete="off">
                    <fieldset className="form__fieldset">
                        <button className="form__button " type="submit">
                            Yes
                        </button>
                    </fieldset>
                </form>
            </div>
        </div>
    </div> */}
        <PopupWithForm
        title="Are you sure?"
        name="popup-type-delete-card"
        buttonText="Yes"
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
