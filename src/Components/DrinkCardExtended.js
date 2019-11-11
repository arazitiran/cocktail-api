import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../components_css/drinkCardExtended.css';

let DrinkCard = (props) => {
    let allDrinks = useSelector(state => state.allDrinks);
    let expendedDrink = useSelector(state => state.expendedDrink);
    let dispatch = useDispatch();

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        dispatch({ type: "FETCH_DATA_EXPENDED", payload: { idDrink: props.match.params.idDrink } });
    }, []);


    let getFollowingPropsToArray = (propName) => {

        // vars
        let index = 1;
        let result = [];
        let currentProp = expendedDrink[propName + index];

        // find props untill theyre null
        while (currentProp) {
            result.push(currentProp);
            currentProp = expendedDrink[propName + ++index];
        }
        return result;
    }

    let getIngredients = getFollowingPropsToArray("strIngredient");
    let getIngredientsSizes = getFollowingPropsToArray("strMeasure");

    var connectIngredientsWithMesauers = getIngredients.map((ingredient, index) => {
        return getIngredientsSizes[index] + " / " + ingredient;
    });

    console.log("fired " + JSON.stringify(expendedDrink));
    let currentDrink = allDrinks.find(e => e.idDrink === props.match.params.idDrink);
    return (
        <div class="container mt-3">
            <div class="col-lg-8 offset-lg-2">
                <div class="card bg-dark text-white">
                    <img class="card-img" src={expendedDrink.strDrinkThumb} alt="Card image" />
                    <div class="card-img-overlay">
                        <h4 class="card-title">{expendedDrink.strDrink}</h4>
                        <p class="card-text">
                            <p> {expendedDrink.strCategory} <br></br>
                                {expendedDrink.strAlcoholic} <br></br>
                                {expendedDrink.strGlass} <br></br>
                                {expendedDrink.strInstructions}
                            </p>
                        </p>
                        <ul >
                            {
                                connectIngredientsWithMesauers.map((ingredient) => {
                                    return <li > {ingredient} </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default DrinkCard;