import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../components_css/main.css';
import { Link } from 'react-router-dom';

function Main() {
  let allDrinks = useSelector(state => state.allDrinks);
  let dispatch = useDispatch();

  let changeAmountOfData = () => {
    dispatch({ type: "FETCH_DATA", payload: { amount: '10' } });
  }

  return (
    <React.Fragment>
    <main className="container-fluid vh-100 bg-light">
      <div className="row vh-200">
        <div class="col-12 text-center mt-4">
        <h1 class="display-2"> Beer List </h1>
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
                      <div class="col-lg-3 col-md-6 py-2" key={drink.idDrink}>
                        <div className="card h-100">
                          <img class="card-img-top img-fluid" src={drink.strDrinkThumb} alt={drink.strDrink} />
                          <div class="card-body">
                            <h4 class="card-title"> {drink.strDrink} </h4>
                            <div class="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown
  </button>
  <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
    <button className="dropdown-item" type="button">Action</button>
    <button className="dropdown-item" type="button">Another action</button>
    <button className="dropdown-item" type="button">Something else here</button>
  </div>
</div>
                            </div>
                            <div class="card-footer">
                            <Link  className="btn btn-outline-primary" to={`/drink-card/${drink.idDrink}`}> Expand </Link>
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
    </React.Fragment>
  );
}
export default Main