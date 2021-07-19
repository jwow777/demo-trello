import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import './Header.css';

function Header() {
  const store = useContext(AppContext);

  return (
    <header className='header'>
      <button className='header__logout' onClick={store.handleClickLogout}>Выйти</button>
    </header>
  );
}

export default Header;