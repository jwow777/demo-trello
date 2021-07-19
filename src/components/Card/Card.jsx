import React, { useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { AppContext } from '../../context/AppContext';
import './Card.css';

function Card({ itemData, columnId, cardId }) {
  const store = useContext(AppContext);
  const { id, text } = itemData;

  const handleDelete = () => store.handleDeleteCard(id);

  return (
    <Draggable draggableId={`${columnId + '-' + cardId}`} index={cardId}>
      {
        provided => (
          <div className='card'
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <button className='card__button-delete' onClick={handleDelete}>+</button>
            <div className='card__id-block'>
              <h3 className='card__id card__id_name'>id:</h3>
              <p className='card__id card__id_number'>{id}</p>
            </div>
            <p className='card__text'>{text}</p>
          </div>
        )
      }
    </Draggable>
  );
}

export default Card;
