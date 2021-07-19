import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Header from '../Header/Header';
import Column from '../Column/Column';
import './Main.css';
import { DragDropContext } from 'react-beautiful-dnd';

function Main() {
  const store = useContext(AppContext);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const columnStart = source.droppableId;
    const columnFinish = destination.droppableId;
    const columnPositionStart = source.index;
    const columnPositionFinish = destination.index;
    if (source.droppableId !== destination.droppableId || source.index !== destination.index) {
      console.log(`----------------`);
      console.log(`Колонка: ${columnStart} => ${columnFinish}`);
      console.log(`Позиция: ${columnPositionStart} => ${columnPositionFinish}`);
    }
  }
  return (
    <>
      <Header/>
      <main className='main'>
        <DragDropContext onDragEnd={onDragEnd}>
          {
            store.titleColumns.map((item, index) => 
              <Column
                title={item}
                columnId={index}
                key={index}
              />
            )
          }
        </DragDropContext>
      </main>
    </>
  );
}

export default Main;