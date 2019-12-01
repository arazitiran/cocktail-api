import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../components_css/drinkCardExtended.css';
import { Link } from 'react-router-dom';

let DrinkCardExtended = (props) => {
    let dispatch = useDispatch();

    const stableDispatch = useCallback(dispatch, [])

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        dispatch({ type: "FETCH_DATA_EXPENDED", payload: { idDrink: props.match.params.idDrink } });
    }, []);

    let expendedDrink = useSelector(state => state.expendedDrink);
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

    console.log("fired " + JSON.stringify(expendedDrink.idDrink));
    let allDrinks = useSelector(state => state.allDrinks);
    let index = allDrinks.find(e=> e.idDrink = expendedDrink.idDrink);
    //console.log("checks: "+ allDrinks[index+1].idDrink);
    return (
        <div className="container mt-3">
            <div className="col-lg-8 offset-lg-2">
                <div className="card bg-dark text-white justify-content-center">
                    <img className="card-img" src={expendedDrink.strDrinkThumb} alt={expendedDrink.strDrink} />
                    <div className="card-img-overlay">
                        <h4 className="card-title">{expendedDrink.strDrink}</h4>
                        <div className="card-text mb-3">
                                <h6 className="d-inline">Category: </h6>
                                {expendedDrink.strCategory} <br></br>
                                <h6 className="d-inline">Alcoholic: </h6>
                                {expendedDrink.strAlcoholic} <br></br>
                                <h6 className="d-inline">Glass: </h6>
                                {expendedDrink.strGlass} <br></br>
                            <h5>Instructions: </h5>
                                {expendedDrink.strInstructions}
                        </div>
                        <h5>Ingredients: </h5>
                        <ul className="fa-ul">
                            {
                                connectIngredientsWithMesauers.map((ingredient, i) => {
                                    return <li key={i}> <i className="fa-li fa fa-square"></i> {ingredient} </li>
                                })
                            }
                        </ul>
                        <div className="text-center">

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default DrinkCardExtended;

// to be added:
/*
<Link type="button" to={`/drink-card/${index+1}`} className="btn btn-default btn-lg">
<i className="fa fa-long-arrow-right fa-lg"></i>
</Link> */