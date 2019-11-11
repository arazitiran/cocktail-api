import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DrinksPills from './DrinksPills'

let Favorites = (props) => {
  let allDrinks = useSelector(state => state.allDrinks);
  let dispatch = useDispatch();

  let changeAmountOfData = () => {
    dispatch({ type: "FETCH_DATA", payload: { amount: '10' } });
  }

  return (
    <main className="container-fluid vh-100 bg-light">
      <div className="row vh-100">
        <div class="col-12 text-center mt-4">
        <h1 class="display-2"> Arrange Drinks </h1>
        <div className="row justify-content-left align-items-left pl-3 pr-3 pb-3">
            {
              allDrinks.length === 0 ?
                <div className="row justify-content-center">
                  <div className="spinner-border text-success" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
                :
                <div class="container mt-3">
                <div className="row">
                  {allDrinks.map((drink) => {
                    return (
                      <div class="col-sm-6 col-lg-3 py-2">
                        <div class="card h-100">
                          <img class="card-img-top" src={drink.strDrinkThumb} alt={drink.strDrink} />
                          <div class="card-body">
                            <h4 class="card-title"> {drink.strDrink} </h4>
                            </div>
                            <div class="card-footer">
                            <a href="#" class="btn btn-warning">
                            <i class="fa fa-star-empty"/>
                              Favorite </a>
                            <p class="card-text"><small class="text-muted"> {drink.idDrink} </small></p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                </div>
            }
          </div>
        </div>
      </div>
    </main>
  );
}
export default Favorites