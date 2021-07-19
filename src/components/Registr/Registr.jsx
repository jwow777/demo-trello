import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../utils/useFormValidation';
import { AppContext } from '../../context/AppContext';
import './Registr.css';

function Registr() {
  const store = useContext(AppContext);
  const { values, errors, isValid, handleChange } = useFormWithValidation({});

  const handleSubmit = (e) => {
    e.preventDefault();
    store.handleClickRegistr(values);
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <h2 className='form__title'>Регистрация</h2>
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
        Email
        <input type='email' name='email' value={values.email || ''} onChange={handleChange} maxLength={254} className='form__input'/>
      </label>
      {
        errors.email
        ? <span className='form__error'>{errors.email}</span>
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
      <button type='submit' className='form__submit' disabled={!isValid}>Зарегистрироваться</button>
      <Link to='/sign-in' className='form__link'>Есть аккаунт? Авторизоваться</Link>
    </form>
  );
}

export default Registr;