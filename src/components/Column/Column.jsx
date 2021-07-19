import React, { useContext, useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { AppContext } from '../../context/AppContext';
import Card from '../Card/Card';
import './Column.css';

function Column({ title, columnId }) {
  const store = useContext(AppContext);

  const backgroundColor = () => {
    const classBG = 'column__title-block_'
    switch (columnId) {
      case 0: 
        return classBG + 'on-hold';
      case 1: 
        return classBG + 'in-progress';
      case 2: 
        return classBG + 'needs-review';
      case 3: 
        return classBG + 'approved';
      default: 
        return '';
     }
  };
  
  const [amount, setAmount] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');

  const handleOpenForm = () => setIsOpen(true);

  const handleCloseForm = () => {
    setIsOpen(false);
    setValue('');
  };

  const handleChange = (e) => setValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    store.handleAddCard(value, String(columnId));
    handleCloseForm();
  };

  useEffect(() => {
    if (store.cardsList.length > 0) {
      const filter = store.cardsList.filter(card => card.row === `${columnId}`);
      setAmount(filter);
    }
  }, [columnId, store.cardsList, store.loggedIn]);

  return (
    <Droppable droppableId={`${columnId}`}>
      {
        provided => (
          <div className='column' ref={provided.innerRef} {...provided.droppableProps}>
            <div className={`column__title-block ${backgroundColor()}`}>
              <h2 className='column__title'>{title} ({amount.length || 0})</h2>
            </div>
            <div className='column__cards-list'>
              {
                amount.map((itemData, index) => <Card itemData={itemData} columnId={columnId} cardId={index} key={itemData.id}/>)
              }
              {
                provided.placeholder
              }
            </div>
            {
              isOpen
              ? (
                <form className='column__form' onSubmit={handleSubmit}>
                  <textarea className='column__textarea' value={value} onChange={handleChange}></textarea>
                  <button type='submit' disabled={!value} className='column__button column__button_submit'>Добавить карточку</button>
                  <button type='button' className='column__button column__button_close' onClick={handleCloseForm}>+</button>
                </form>
              )
              : (
                <button type='button' className='column__button column__button_add' onClick={handleOpenForm}>Добавить карточку</button>
              )
            }
          </div>           
        )
      }
    </Droppable>
  );
}

export default Column;
