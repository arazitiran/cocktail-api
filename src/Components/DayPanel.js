import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd'
import DrinkCard from './DrinkCard';


let DayPanel = ({ idDayPanel, accept, onDrop }) => {
  let MAXIMUM_DRINKS = 2;
  let allDrinkInDayPanel = useSelector(state => state.daysDrink[idDayPanel]);
  let dispatch = useDispatch();
  let daysDrink = useSelector(state => state.daysDrink);

  let removeDrink = (idDrink, idDayPanel) => {
    dispatch({ type: "DELETE_DRINK_FROM_DAY", payload: { idDrink: idDrink, day: idDayPanel } });
    localStorage.setItem("daysDrink",  JSON.stringify(daysDrink));
  }

  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    canDrop: () => { return allDrinkInDayPanel.length < MAXIMUM_DRINKS },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
  })

  const isActive = isOver && canDrop
  let backgroundColor = '#fff'
  if (isActive) {
    backgroundColor = '#007bff'
  } else if (canDrop) {
    backgroundColor = '#dc3545' 
  }

  return (
    <div ref={drop} style={{ backgroundColor, minHeight:"100px" }} >
            {allDrinkInDayPanel.map((idDrink) => {
              return (<DrinkCard day={idDayPanel} idDrink={idDrink} onRemove={() => removeDrink(idDrink, idDayPanel)}/>) 
            })}
      </div>
  );
}

export default DayPanel