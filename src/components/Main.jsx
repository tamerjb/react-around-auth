import React, { useEffect, useState } from "react";
import { api } from "../utils/api";
import Card from "./Card";

const Main = (props) => {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
        // setLikesCount(res.likes);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
        // setLikesCount(res.likes);
      })
      .catch(console.log);
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div
          onClick={props.onEditAvatarClick}
          className="profile__image-container"
        >
          <img
            src={userAvatar}
            alt="Profile Picture"
            className="profile__image"
          />
        </div>
        <div className="profile__info">
          <div className="profile__person">
            <h1 className="profile__name">{userName}</h1>
            <button
              onClick={props.onEditProfileClick}
              className="profile__edit-button"
              type="button"
            />
          </div>
          <p className="profile__title">{userDescription}</p>
        </div>
        <button
          onClick={props.onAddPlaceClick}
          className="profile__add-button"
          type="button"
        />
      </section>
      <section className="cards">
        <ul className="cards__list">
          {cards.map((card) => {
            return (
              <Card
                card={card}
                key={card._id}
                onCardClick={props.onCardClick}
                onDeleteClick={props.onDeleteClick}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
};

export default Main;
