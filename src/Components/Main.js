import React from 'react';
import { useSelector } from 'react-redux';
import '../components_css/main.css';
import DrinkCard from './DrinkCard';


function Main() {
  let allDrinks = useSelector(state => state.allDrinks);
 
  return (
    <React.Fragment>
      <main className="container-fluid h-100 bg-light">
        <div className="row vh-200">
          <div className="col-12 text-center mt-4">
            <h1 className="display-2"> Cocktails' list </h1>
            <div className="row justify-content-left align-items-left pl-3 pr-3 pb-3">
              {
                allDrinks.length === 0 ?
                  <div className="row justify-content-center">
                    <div className="spinner-border text-success" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                  :
                  <div className="container mt-3">
                    <div className="row">
                      {allDrinks.map((drink) => {
                        return (
                          <div key={drink.idDrink} className="col-lg-3 col-md-6 py-2" >
                            <DrinkCard idDrink={drink.idDrink} />
                          </div>
                        )
                      })
                      }
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