import React, { useEffect } from 'react';
import './App.css';
import Header from './Components/Header';
import Main from './Components/Main';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import { drinksReducer } from './reducers/drinksReducer';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './reducers/sagas'
import { createStore, applyMiddleware } from 'redux';
import Favorites from './Components/Favorites';
import DrinkCardExtended from './Components/DrinkCardExtended';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(drinksReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga)

function App() {
 
  useEffect(() => {
    store.dispatch({ type: "FETCH_DATA", payload: { idDrink: 0 } });
  }, [])

  return (
    <React.Fragment>
       <Provider store={store}>
       <Router>
        <Header />

        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/Favorites" component={Favorites} />
          <Route exact path="/about" />
          <Route exact path="/drink-card/:idDrink" component={DrinkCardExtended} />
          <Route path="*" /*component={}}*/ />
        </Switch>

      </Router>
       </Provider>
    </React.Fragment>
  );
}

export default App;
