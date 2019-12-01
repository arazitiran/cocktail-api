import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../components_css/drinkCardExtended.css';
import { Link } from 'react-router-dom';
//import { DragSource } from 'react-dnd'
import { useDrag } from 'react-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


let DrinkCard = ({ idDrink, onRemove, day }) => {

    const [{ opacity }, drag] = useDrag({
        item: { idDrink, day,  type: "card" },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    })

    //const { isDragging, connectDragSource, item } = props;

    let allDrinks = useSelector(state => state.allDrinks);
    let drink = allDrinks.find(e => e.idDrink === idDrink);
    let dispatch = useDispatch();

    let followToggle = () => {
        console.log(drink);
        if (drink.follow) {
            drink.follow = false;
            dispatch({ type: "FOLLOW", payload: drink });
            localStorage.removeItem(drink.idDrink);
        } else {
            drink.follow = true;
            dispatch({ type: "FOLLOW", payload: drink });
            localStorage.setItem(drink.idDrink, drink.follow);
        }
    }
        return(
        <div className="card h-100"  ref={drag} style={{opacity}} >
            <img className="card-img-top img-fluid" src={drink.strDrinkThumb} alt={drink.strDrink} />
            <div className="card-body">
                <h6 className="card-title"> {drink.strDrink} </h6>
            </div>
            <div className="card-footer">
            <div className="btn-group flex-wrap" role="group" aria-label="Basic example">
                <Link className="btn btn-outline-dark" to={`/drink-card/${drink.idDrink}`}> Expand </Link>
                <button key={drink.idDrink} onClick={followToggle} className={drink.follow ? 'btn btn-danger' : 'btn btn-success'}>
                    {drink.follow ? 'Unfollow' : 'Follow'}
                </button>
                </div>
                {onRemove?
                            <button onClick={onRemove} type="button" className="btn btn-light btn-sm">
                           <i className="fa fa-trash fa-lg" ></i>
                          </button>
                    : null}
            </div>
        </div>
     ); 
}

export default DrinkCard/* DragSource("card", cardSource, collect)() */