import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePopup from './DeletePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';

function App() {
  //set States
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    name: '',
    link: '',
  });
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  // loading button Text
  const [isLoading, setIsLoading] = useState(false);
  const [infoTooltipType, setInfoTooltipType] = useState('');
  const [modalOpen, toggleModal] = useState(false);

  const modaltoggle = () => {
    toggleModal(!modalOpen);
  };

  const closeAllPopups = () => {
    // setIsEditAvatarPopupOpen(false);
    // setIsEditProfilePopupOpen(false);
    // setIsAddPlacePopupOpen(false);
    // setIsImagePreviewOpen(false);
    // setIsDeletePopupOpen(false);
    // setIsInfoTooltipOpen(false);
    toggleModal(false);
  };
  //state for loggedIn
  const [loggedIn, setLoggedIn] = useState(false);

  //state for user data
  const [userData, setUserData] = useState({
    email: 'email@mail.com',
  });
  //state for checking token
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  //history hook
  const history = useHistory();

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
      if (event.key === 'Escape') {
        closeAllPopups();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  //Overlay  close Modual
  // useEffect(() => {
  //   const handleMouseDown = (event) => {
  //     if (event.target.classList.contains('popup')) {
  //       closeAllPopups();
  //     }
  //   };

  //   document.addEventListener('mousedown', handleMouseDown);
  //   return () => {
  //     document.removeEventListener('mousedown', handleMouseDown);
  //   };
  // }, []);
  //check token
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res.data._id) {
            setLoggedIn(true);
            setUserData({ email: res.data.email });
            history.push('/react-around-auth');
          }
        })
        .catch((err) => {
          console.log(err);
          history.push('/signin');
        })
        .finally(() => {
          setIsCheckingToken(false);
        });
    } else {
      setIsCheckingToken(false);
    }
  }, []);
  function handleRegister({ email, password }) {
    setIsLoading(true);
    auth
      .register(email, password)
      .then((res) => {
        if (res.data._id) {
          setInfoTooltipType('successful');
          history.push('/signin');
        } else {
          setInfoTooltipType('unsuccessful');
        }
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipType('unsuccessful');
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
        setIsLoading(false);
      });
  }

  function handleLogin({ email, password }) {
    setIsLoading(true);
    auth
      .login(email, password)
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          setUserData({ email });
          localStorage.setItem('jwt', res.token);
          history.push('/react-around-auth');
        }
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipType('unsuccessful');
        setIsInfoTooltipOpen(true);
      })
      .finally(() => {
        setIsCheckingToken(false);
        setIsLoading(false);
      });
  }

  function handleSignout() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/signin');
  }

  return (
    <div className='body'>
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          loggedIn={loggedIn}
          email={userData.email}
          handleSignout={handleSignout}
        />
        <Switch>
          <ProtectedRoute
            exact
            path='/react-around-auth'
            loggedIn={loggedIn}
            isCheckingToken={isCheckingToken}
          >
            <Main
              onEditProfileClick={handleEditProfileClick}
              onAddPlaceClick={modaltoggle}
              onEditAvatarClick={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onDeleteClick={handleDeleteClick}
              onCardLike={handleCardLike}
              cards={cards}
            />
          </ProtectedRoute>
          <Route path='/signup'>
            <Register handleRegister={handleRegister} />
          </Route>

          <Route path='/signin'>
            <Login handleLogin={handleLogin} isLoading={isLoading} />
          </Route>

          <Route>
            {loggedIn ? (
              <Redirect to='/react-around-auth' />
            ) : (
              <Redirect to='/signin' />
            )}
          </Route>
        </Switch>

        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isLoading={isLoading}
          isOpen={modalOpen}
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
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          type={infoTooltipType}
          isTooltipOpen={isInfoTooltipOpen}
          name='tooltip'
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
