import React, { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";


function App() {
  return (
    <div className="App">
     <body className="body">
    <Header/>
    <Main/>
    <Footer/>

    <div className="popup popup-edit-profile ">
        <div className="popup-edit-profile ">
            <button className="popup__close-button" type="button"></button>
            {/* <!-- edit Profile popup --> */}
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
    </div>
    {/* <!-- add newCard popup --> */}
    <div className="popup popup-place">
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
    </div>

    {/* <!-- Card Template --> */}
    <template id="card-template">
        <li className="card">
            <button type="button" aria-label="delete card" className="card__image-trash"></button>
            <img src="#" alt="#" className="card__image" />
            <div className="card__info">
                <h2 className="card__info-title"></h2>
                <div className="card__like-container">
                    <button className="card__like-button" type="button" aria-label="like card"></button><span
                        className="card__like-count"></span>
                </div>
            </div>

        </li>
    </template>
    {/* <!-- Preview image popup --> */}
    <div className="popup-prev popup ">
        <div className="popup__preview-container">
            <button className="popup__close-button" type="button"></button>
            <img src="#" alt="#" className="popup__image" />
            <p className="popup__caption"></p>
        </div>
    </div>
    {/* <!-- edit avatar popup --> */}
    <div className="popup popup_type_avatar">
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
    </div>
    {/* <!-- delete card form --> */}
    <div className="popup popup-type-delete-card ">
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
    </div>
</body>

    </div>
  );
}

export default App;
