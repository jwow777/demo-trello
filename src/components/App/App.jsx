import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Registr from '../Registr/Registr';
import './App.css';
import api from '../../utils/api';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [cardsList, setCardsList] = useState([]);
  const history = useHistory();
  const titleColumns = ['On hold', 'In progress', 'Needs review', 'Approved'];

  const tokenCheck = (res) => {
    localStorage.setItem('jwt', res.token);
    setLoggedIn(true);
    history.push('/');
    api.getCards(res.token)
    .then((res) => setCardsList(res))
    .catch((err) => console.log(err));
  };

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token) {
      api.refreshToken(token)
      .then((res) => tokenCheck(res))
      .catch((err) => console.log(err));
    }
  }, [history, loggedIn]);

  const handleClickLogin = (values) => {
    setLoggedIn(true);
    return api.loginUser(values)
    .then((res) => tokenCheck(res))
    .catch((err) => console.log(err));
  }

  const handleClickRegistr = (values) => {
    return api.createUser(values)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        history.push('/');
      })
      .catch((err) => console.log(err));
  };

  const handleClickLogout = () => {
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  };

  const handleAddCard = (value, row) => {
    const token = localStorage.getItem('jwt')
    return api.createCard(value, row, token)
    .then((res) => setCardsList([ ...cardsList, res ]))
    .catch((err) => console.log(err));
  };

  const handleDeleteCard = (id) => {
    const token = localStorage.getItem('jwt')
    return api.deleteCard(id, token)
    .then(() => setCardsList(cardsList.filter(card => card.id !== id)))
    .catch((err) => console.log(err));
  };

  return (
      <AppContext.Provider value={{loggedIn, titleColumns, cardsList, setCardsList, handleClickLogin, handleClickRegistr, handleClickLogout, handleAddCard, handleDeleteCard}}>
        <Switch>
          <Route path='/sign-in'>
            <Login/>
          </Route>
          <Route path='/sign-up'>
            <Registr/>
          </Route>
          <ProtectedRoute
            exact path='/'
            component={Main}
          />    
        </Switch>
      </AppContext.Provider>
  );
}

export default App;
