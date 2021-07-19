import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../utils/useFormValidation';
import { AppContext } from '../../context/AppContext';
import './Login.css';

function Login() {
  const store = useContext(AppContext);
  const { values, errors, isValid, handleChange } = useFormWithValidation({});

  const handleSubmit = (e) => {
    e.preventDefault();
    store.handleClickLogin(values);
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <h2 className='form__title'>Авторизация</h2>
      <label className='form__label'>
        Username
        <input type='text' name='username' value={values.username || ''} onChange={handleChange} minLength={1} maxLength={150} required className='form__input'/>
      </label>
      {
        errors.username
        ? <span className='form__error'>{errors.username}</span>
        : ''
      }
      <label className='form__label'>
        Password
        <input type='password' name='password' value={values.password || ''} onChange={handleChange} minLength={1} maxLength={128} required className='form__input'/>
      </label>
      {
        errors.password
        ? <span className='form__error'>{errors.password}</span>
        : ''
      }
      <button type='submit' className='form__submit' disabled={!isValid}>Войти</button>
      <Link to='/sign-up' className='form__link'>Нет аккаунта? Зарегистрируйтесь</Link>
    </form>
  );
}

export default Login;
