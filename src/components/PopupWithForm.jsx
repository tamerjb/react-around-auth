import React from "react";

const PopupWithForm = ({
  isOpen,
  onClose,
  name,
  title,
  buttonText,
  children,
}) => {
  return (
    <div className={`popup ${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form action="submit" className="form popup__form" name={name}>
          {children}
          <fieldset className="form__fieldset">
            <button className="form__button" type="submit">
              {buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
